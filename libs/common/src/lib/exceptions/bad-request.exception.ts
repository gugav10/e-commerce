import { Exception, ExceptionOptions } from './base.exception';

const defaultMessage = 'Bad request';

export class BadRequestException extends Exception {
  constructor(details?: Partial<ExceptionOptions>) {
    super(defaultMessage, {
      code: 'BAD_REQUEST',
      status: 400,
      ...details,
    });
  }
}
