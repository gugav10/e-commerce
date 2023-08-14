import { createZodValidationPipe } from 'nestjs-zod';
import { ZodError } from 'nestjs-zod/z';
import { BadRequestException } from '../exceptions';

export const CommonZodValidationPipe = createZodValidationPipe({
  createValidationException: (error: ZodError) => {
    return new BadRequestException({ errors: error.errors });
  },
});
