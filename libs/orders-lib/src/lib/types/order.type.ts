import {
  Directive,
  Field,
  GraphQLISODateTime,
  ID,
  ObjectType,
} from '@nestjs/graphql';
import { IOrder } from '../interfaces';
import { OrderStatus } from '../enums';
import { ProductReference } from '@app/common';

@ObjectType()
@Directive('@key(fields: "id")')
export class Order implements Partial<IOrder> {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  deliveryId: string;

  @Field(() => ID)
  productId: string;

  @Field(() => ID)
  userId: string;

  @Field(() => OrderStatus)
  status: OrderStatus;

  @Field(() => ProductReference)
  product?: ProductReference;

  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt: Date;
}
