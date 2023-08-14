import { ArgumentsHost } from '@nestjs/common';
import { Exception } from '../exceptions';
import { Observable } from 'rxjs';

export interface TransportExceptionHandler {
  handle(exception: Exception, host: ArgumentsHost): any | Observable<any>;
  supports(type: CContextType): boolean;
}

export type CContextType = 'http' | 'graphql' | 'rpc';
