import { Exception, ExceptionOptions } from './base.exception';

const defaultMessage = 'Conflict';

export class ConflictException extends Exception {
  constructor(details?: Partial<ExceptionOptions>) {
    super(defaultMessage, {
      code: 'CONFLICT',
      status: 409,
      ...details,
    });
  }
}
