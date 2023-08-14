import { createZodDto } from 'nestjs-zod';
import { CreateProductInputSchema } from '../schemas';
import { Field, InputType, Int } from '@nestjs/graphql';
import { GraphQLString } from 'graphql';

@InputType()
export class CreateProductInput extends createZodDto(CreateProductInputSchema) {
  @Field(() => GraphQLString)
  title: string;

  @Field(() => GraphQLString)
  description: string;

  @Field(() => Int)
  price: number;
}
