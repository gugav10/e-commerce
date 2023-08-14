import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { GraphQLBoolean, GraphQLInt } from 'graphql';
import { types as warehouseStockTypes } from '@app/warehouse-stocks';

@ObjectType()
@Directive('@key(fields: "productId")')
export class Stock {
  @Field(() => ID)
  productId: string;

  @Field(() => [warehouseStockTypes.WarehouseStock])
  stocks: warehouseStockTypes.WarehouseStock[];

  @Field(() => GraphQLBoolean)
  inStock?: boolean;

  @Field(() => GraphQLInt)
  stockAmount?: number;
}
