import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { ICity } from '../interfaces';
import { GraphQLString } from 'graphql';

@ObjectType()
@Directive('@key(fields: "id")')
export class City implements ICity {
  @Field(() => ID)
  id: string;

  @Field(() => GraphQLString)
  title: string;
}
