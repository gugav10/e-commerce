import { Field, InputType } from '@nestjs/graphql';
import { GraphQLString } from 'graphql';
import { createZodDto } from 'nestjs-zod';
import { RegisterInputSchema } from '../schemas';

@InputType()
export class RegisterInput extends createZodDto(RegisterInputSchema) {
  @Field(() => GraphQLString)
  email: string;

  @Field(() => GraphQLString)
  username: string;

  @Field(() => GraphQLString)
  password: string;

  @Field(() => GraphQLString)
  deviceId: string;
}
