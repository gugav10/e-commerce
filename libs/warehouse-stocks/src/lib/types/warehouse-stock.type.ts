import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { IWarehouseStock } from '../interfaces';
import { GraphQLInt } from 'graphql';
import { types as warehouseTypes } from '@app/warehouses';

@ObjectType()
@Directive('@key(fields: "id")')
export class WarehouseStock implements Partial<IWarehouseStock> {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  productId: string;

  @Field(() => ID)
  warehouseId: string;

  @Field(() => warehouseTypes.Warehouse, { nullable: true })
  warehouse?: warehouseTypes.Warehouse;

  @Field(() => GraphQLInt)
  quantity: number;
}
