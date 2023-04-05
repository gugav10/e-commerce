import { Module } from '@nestjs/common';
import { AuthLibService } from './auth-lib.service';

@Module({
  providers: [AuthLibService],
  exports: [AuthLibService],
})
export class AuthLibModule {}
