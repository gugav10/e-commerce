import { Inject, Injectable } from '@nestjs/common';
import { entities } from '@app/users';
import { Token } from './entities';
import { TOKENS_REPOSITORY_TOKEN, TokensRepository } from './repositories';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { JwtConfig, TokenCreationAttributes } from './interfaces';
import { ConfigService } from '@nestjs/config';
import { addDays } from '@app/common';

@Injectable()
export class TokensService {
  constructor(
    @Inject(TOKENS_REPOSITORY_TOKEN) private tokensRepository: TokensRepository,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  findById(id: string): Promise<Token> {
    return this.tokensRepository.findById(id);
  }

  create(dto: TokenCreationAttributes): Promise<Token> {
    if (!dto.accessToken || !dto.refreshToken) {
      return null;
    }

    return this.tokensRepository.create(dto);
  }

  generateTokens(user: entities.User, deviceId: string): Promise<Token> {
    const payload = {
      sub: user.id,
      deviceId,
    };

    const expiredAt = addDays(
      new Date(),
      this.configService.get<JwtConfig>('jwt').refreshInDays,
    );

    const accessToken = this.generateAccessToken(payload);
    const refreshToken = this.generateRefreshToken(payload);

    return this.create({
      accessToken,
      refreshToken,
      userId: user.id,
      expiredAt,
      deviceId,
    });
  }

  private generateAccessToken(payload: {
    sub: string;
    deviceId: string;
  }): string {
    return this.jwtService.sign({ ...payload, type: 'access' });
  }

  private generateRefreshToken(payload: {
    sub: string;
    deviceId: string;
  }): string {
    const { refreshIn, refreshSecret } =
      this.configService.get<JwtConfig>('jwt');
    const options: JwtSignOptions = {
      secret: refreshSecret,
      expiresIn: refreshIn,
    };

    return this.jwtService.sign({ ...payload, type: 'refresh' }, options);
  }

  findByDeviceIdAndUserId(deviceId: string, userId: string): Promise<Token> {
    return this.tokensRepository.findByDeviceIdAndUserId(deviceId, userId);
  }

  deleteById(id: string) {
    return this.tokensRepository.deleteById(id);
  }
}
