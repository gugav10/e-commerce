import { Injectable } from '@nestjs/common';
import {
  Role,
  UsernameOrEmail,
  UsersService,
  entities as userEntities,
} from '@app/users';
import { TokensService } from '@app/tokens';
import { PasswordService } from '@app/password';
import { LoginInput } from './dto';
import { ConflictException, UnauthorizedException } from '@app/common';
import { RegisterInput } from './dto/register.input';
import { AuthResponse } from './types';

@Injectable()
export class AuthLibService {
  constructor(
    private usersService: UsersService,
    private tokensService: TokensService,
    private passwordService: PasswordService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<userEntities.User | null> {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      return null;
    }

    const match = await this.passwordService.compare(password, user.password);
    if (!match) {
      return null;
    }
    delete user.password;
    return user;
  }

  async login(input: LoginInput): Promise<AuthResponse> {
    const user = await this.validateUser(input.email, input.password);

    if (!user) {
      throw new UnauthorizedException();
    }

    // logout from previous session if present
    await this.logout(user.id, input.deviceId);
    return this.performLogin(user, input.deviceId);
  }

  async isRegistered(input: UsernameOrEmail): Promise<boolean> {
    const user = await this.usersService.getUserByUsernameOrEmail({
      username: input.username,
      email: input.email,
    });

    return Boolean(user);
  }

  async register(input: RegisterInput): Promise<AuthResponse> {
    const { password, deviceId } = input;
    const hashedPassword = await this.passwordService.hashPassword(password);

    const isRegistered = await this.isRegistered({
      username: input.username,
      email: input.email,
    });

    if (isRegistered) {
      throw new ConflictException();
    }

    const user = await this.usersService.create({
      ...input,
      password: hashedPassword,
      role: Role.CUSTOMER,
      isActive: true,
      isVerified: true,
    });

    return this.performLogin(user, deviceId);
  }

  async performLogin(
    user: userEntities.User,
    deviceId: string,
  ): Promise<AuthResponse> {
    const token = await this.tokensService.generateTokens(user, deviceId);

    return {
      userId: user.id,
      user,
      credentials: token,
    };
  }

  async logout(userId: string, deviceId: string): Promise<void> {
    if (!deviceId) {
      return;
    }

    const session = await this.tokensService.findByDeviceIdAndUserId(
      deviceId,
      userId,
    );

    if (!session) {
      return;
    }
    await this.tokensService.deleteById(session.id);
  }
}
