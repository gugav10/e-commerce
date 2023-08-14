import { CanActivate, UnauthorizedException } from '@nestjs/common';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { UserPayload } from '../interfaces';

@Injectable()
export class GqlAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;
    if (!req.headers?.payload) {
      throw new UnauthorizedException();
    }
    req.payload = JSON.parse(req.headers.payload) as UserPayload;
    return req;
  }
}
