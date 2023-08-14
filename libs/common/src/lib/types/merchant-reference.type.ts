import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { GraphQLReferenceType } from '@app/common';

@ObjectType(GraphQLReferenceType.MERCHANT)
@Directive('@key(fields: "userId")')
@Directive('@shareable')
export class MerchantReference {
  @Field(() => ID)
  userId: string;
}
