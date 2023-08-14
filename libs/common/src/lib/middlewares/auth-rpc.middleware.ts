import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthRpcService } from '@app/auth-rpc';
import { UserPayload } from '../interfaces';

@Injectable()
export class AuthRpcMiddleware implements NestMiddleware {
  constructor(private readonly authRpcService: AuthRpcService) {}

  async use(
    req: Request & { payload: UserPayload },
    res: Response,
    next: NextFunction,
  ) {
    if (req.headers.authorization) {
      const user = await this.authRpcService.validateUser(
        req.headers.authorization,
      );
      req.payload = user;
    }
    next();
  }
}
