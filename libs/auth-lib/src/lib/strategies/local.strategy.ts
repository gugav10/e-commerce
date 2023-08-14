import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthLibService } from '../auth-lib.service';
import { UnauthorizedException } from '@app/common';
import { entities as userEntities } from '@app/users';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthLibService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<userEntities.User> {
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
