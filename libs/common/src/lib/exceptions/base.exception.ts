const defaultMessage = 'Internal server error';

export interface ExceptionOptions {
  code: string;
  status?: number;
  [attributeName: string]: unknown;
}

export class Exception extends Error {
  constructor(
    public message: string,
    public readonly details: ExceptionOptions,
  ) {
    super(message || defaultMessage);
    this.name = this.constructor.name;

    Error.captureStackTrace(this, this.constructor);
  }

  getError() {
    return {
      message: this.message,
      details: this.details,
      stack: this.stack,
    };
  }
}
