import { Exception, ExceptionOptions } from './base.exception';

const defaultMessage = 'Unauthorized';

export class UnauthorizedException extends Exception {
  constructor(details?: Partial<ExceptionOptions>) {
    super(defaultMessage, {
      code: 'UNAUTHORIZED',
      status: 404,
      ...details,
    });
  }
}
