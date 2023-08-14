import { ArgumentsHost } from '@nestjs/common';
import { Exception } from '../exceptions';
import { CContextType, TransportExceptionHandler } from '../interfaces';
import { throwError } from 'rxjs';

export class RpcExceptionHandler implements TransportExceptionHandler {
  handle(exception: Exception, _host: ArgumentsHost) {
    return throwError(() => exception.getError());
  }

  supports(type: CContextType): boolean {
    return type === 'rpc';
  }
}
