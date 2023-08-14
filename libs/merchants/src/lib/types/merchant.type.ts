import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { IMerchant } from '../interfaces';
import { GraphQLString } from 'graphql';

@ObjectType()
@Directive('@key(fields: "userId")')
export class Merchant implements Partial<IMerchant> {
  @Field(() => ID)
  userId: string;

  @Field(() => GraphQLString)
  name: string;
}
