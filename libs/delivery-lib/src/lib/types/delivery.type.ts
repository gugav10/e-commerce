import {
  Directive,
  Field,
  GraphQLISODateTime,
  ID,
  ObjectType,
} from '@nestjs/graphql';
import { IDelivery } from '../interfaces';
import { DeliveryStatus } from '../enums';
import { GraphQLString } from 'graphql';

@ObjectType()
@Directive('@key(fields: "id")')
export class Delivery implements Partial<IDelivery> {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  deliverId: string;

  @Field(() => ID)
  locationId: string;

  @Field(() => ID)
  userId: string;

  @Field(() => DeliveryStatus)
  status: DeliveryStatus;

  @Field(() => GraphQLString)
  trackingCode: string;

  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt: Date;
}
