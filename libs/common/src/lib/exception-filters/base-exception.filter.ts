import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  Inject,
  RpcExceptionFilter,
} from '@nestjs/common';
import { Exception } from '../exceptions/base.exception';
import { GqlExceptionFilter } from '@nestjs/graphql';
import { CContextType, TransportExceptionHandler } from '../interfaces';
import {
  GqlExceptionHandler,
  HttpExceptionHandler,
  RpcExceptionHandler,
} from '../exception-handlers';

@Catch(Exception)
export class BaseExceptionFilter
  implements ExceptionFilter, GqlExceptionFilter, RpcExceptionFilter
{
  private readonly handlers: Record<CContextType, TransportExceptionHandler>;

  constructor(
    @Inject(HttpExceptionHandler)
    private readonly httpExceptionHandler: HttpExceptionHandler,
    @Inject(GqlExceptionHandler)
    private readonly gqlExceptionHandler: GqlExceptionHandler,
    @Inject(RpcExceptionHandler)
    private readonly rpcExceptionHandler: RpcExceptionHandler,
  ) {
    this.handlers = {
      http: this.httpExceptionHandler,
      graphql: this.gqlExceptionHandler,
      rpc: this.rpcExceptionHandler,
    };
  }

  catch(exception: Exception, host: ArgumentsHost) {
    const type = host.getType<CContextType>();
    const handler = this.handlers[type];

    if (handler) {
      return handler.handle(exception, host);
    }

    throw exception;
  }
}
