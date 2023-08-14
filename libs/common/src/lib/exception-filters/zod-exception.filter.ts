import { Catch, ExceptionFilter } from '@nestjs/common';
import { GqlExceptionFilter } from '@nestjs/graphql';
import { ZodValidationException } from 'nestjs-zod';
import { BadRequestException } from '../exceptions';

@Catch(ZodValidationException)
export class ZodExceptionFilter implements ExceptionFilter, GqlExceptionFilter {
  catch(exception: ZodValidationException) {
    const error = exception.getZodError();
    throw new BadRequestException({ errors: error.errors });
  }
}
