import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthLibService } from '@app/auth-lib';
import { CurrentUser, JwtAuthGuard, Topic, UserPayload } from '@app/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthLibService) {}

  @Get()
  getHello(): string {
    return 'Auth';
  }

  @UseGuards(JwtAuthGuard)
  @MessagePattern(Topic.VALIDATE_USER)
  async validateUser(@CurrentUser() userPayload: UserPayload) {
    return userPayload;
  }
}
