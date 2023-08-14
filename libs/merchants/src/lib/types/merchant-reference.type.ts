import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { GraphQLReferenceType } from '@app/common';
import { IMerchant } from '../interfaces';

@ObjectType(GraphQLReferenceType.MERCHANT)
@Directive('@key(fields: "userId")')
@Directive('@shareable')
export class MerchantReference implements Partial<IMerchant> {
  @Field(() => ID)
  userId: string;
}
