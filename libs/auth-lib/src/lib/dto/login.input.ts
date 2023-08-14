import { InputType, Field } from '@nestjs/graphql';
import { GraphQLString } from 'graphql';
import { createZodDto } from 'nestjs-zod';
import { LoginInputSchema } from '../schemas';

@InputType()
export class LoginInput extends createZodDto(LoginInputSchema) {
  @Field(() => GraphQLString)
  email: string;

  @Field(() => GraphQLString)
  password: string;

  @Field(() => GraphQLString)
  deviceId: string;
}
