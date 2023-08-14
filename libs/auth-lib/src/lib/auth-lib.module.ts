import { Module } from '@nestjs/common';
import { AuthLibService } from './auth-lib.service';
import { PasswordModule } from '@app/password';
import { UsersLibModule } from '@app/users';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { TokensModule } from '@app/tokens';
import { JwtStrategy } from './strategies';

@Module({
  imports: [PasswordModule, UsersLibModule, PassportModule, TokensModule],
  providers: [AuthLibService, LocalStrategy, JwtStrategy],
  exports: [AuthLibService],
})
export class AuthLibModule {}
