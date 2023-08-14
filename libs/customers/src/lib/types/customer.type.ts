import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { ICustomer } from '../interfaces';
import { GraphQLString } from 'graphql';

@ObjectType()
@Directive('@key(fields: "userId")')
export class Customer implements Partial<ICustomer> {
  @Field(() => ID)
  userId: string;

  @Field(() => GraphQLString)
  firstName: string;

  @Field(() => GraphQLString)
  lastName: string;
}
