import { InputType, Field, ID } from '@nestjs/graphql';
import { GraphQLString } from 'graphql';
import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const CreateUserInputSchema = z.object({
  username: z.string().max(5, 'Maximum username length is 30 characters'),
  email: z
    .string()
    .max(100, 'Maximum email length is 100 characters')
    .email('Invalid email format'),
  password: z
    .password()
    .min(8, 'Minimum password length is 8 characters')
    .max(100, 'Maximum password length is 100 characters')
    .atLeastOne('digit')
    .atLeastOne('special')
    .atLeastOne('uppercase'),
});

@InputType()
export class CreateUserInput extends createZodDto(CreateUserInputSchema) {
  @Field(() => ID)
  id: string;

  @Field(() => GraphQLString)
  username: string;

  @Field(() => GraphQLString)
  email: string;

  @Field(() => GraphQLString)
  password: string;
}
