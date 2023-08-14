import { Inject, Injectable } from '@nestjs/common';
import {
  Service,
  Topic,
  UnauthorizedException,
  UserPayload,
} from '@app/common';
import { lastValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AuthRpcService {
  constructor(@Inject(Service.AUTH) private authClient: ClientProxy) {}

  async validateUser(jwt: string) {
    const user = await lastValueFrom<UserPayload | null>(
      this.authClient.send(Topic.VALIDATE_USER, { Authentication: jwt }),
    );

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
