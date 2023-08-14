import { Exception, ExceptionOptions } from './base.exception';

const defaultMessage = 'Not Found';

export class NotFoundException extends Exception {
  constructor(details?: Partial<ExceptionOptions>) {
    super(defaultMessage, {
      code: 'NOT_FOUND',
      status: 404,
      ...details,
    });
  }
}
