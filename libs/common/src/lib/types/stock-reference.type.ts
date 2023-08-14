import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { GraphQLReferenceType } from '@app/common';

@ObjectType(GraphQLReferenceType.STOCK)
@Directive('@key(fields: "productId")')
@Directive('@shareable')
export class StockReference {
  @Field(() => ID)
  productId: string;
}
