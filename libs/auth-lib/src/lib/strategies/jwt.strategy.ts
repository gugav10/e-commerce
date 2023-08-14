import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { JwtConfig } from '@app/tokens';
import { Injectable } from '@nestjs/common';
import { UsersService } from '@app/users';
import { UserPayload } from '@app/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    protected configService: ConfigService,
    private usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: any) => {
          if (request?.Authentication) {
            return request.Authentication.split(' ')[1];
          }
          return null;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get<JwtConfig>('jwt').accessSecret,
    });
  }

  async validate({
    sub,
    deviceId,
  }: {
    sub: string;
    deviceId: string;
  }): Promise<UserPayload> {
    const user = await this.usersService.findById(sub);
    return { data: user, payload: { deviceId, sub } };
  }
}
