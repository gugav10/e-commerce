import { ArgumentsHost } from '@nestjs/common';
import { GqlArgumentsHost } from '@nestjs/graphql';
import { CContextType, TransportExceptionHandler } from '../interfaces';
import { Exception } from '../exceptions';
import { GraphQLError } from 'graphql';

export class GqlExceptionHandler implements TransportExceptionHandler {
  handle(exception: Exception, host: ArgumentsHost): Error {
    const gqlHost = GqlArgumentsHost.create(host);
    const error = exception.getError();
    return new GraphQLError(error.message, {
      extensions: {
        ...error.details,
      },
    });
  }

  supports(type: CContextType): boolean {
    return type === 'graphql';
  }
}
