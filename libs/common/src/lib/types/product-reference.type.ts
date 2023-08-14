import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { GraphQLReferenceType } from '@app/common';

@ObjectType(GraphQLReferenceType.PRODUCT)
@Directive('@key(fields: "id")')
@Directive('@shareable')
export class ProductReference {
  @Field(() => ID)
  id: string;
}
