import { ArgumentsHost } from '@nestjs/common';
import { CContextType, TransportExceptionHandler } from '../interfaces';
import { Exception } from '../exceptions';
import { Response } from 'express';

export class HttpExceptionHandler implements TransportExceptionHandler {
  handle(exception: Exception, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(exception.details.status).json(exception.getError());
  }

  supports(type: CContextType): boolean {
    return type === 'http';
  }
}
