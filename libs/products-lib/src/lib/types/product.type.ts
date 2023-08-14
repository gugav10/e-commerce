import { Directive, Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { IProduct } from '../interfaces';
import { GraphQLString } from 'graphql';
import { types as merchantTypes } from '@app/merchants';
import { StockReference } from '@app/common';

@ObjectType()
@Directive('@key(fields: "id")')
export class Product implements Partial<IProduct> {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  merchantId: string;

  @Field(() => GraphQLString)
  title: string;

  @Field(() => GraphQLString)
  description: string;

  @Field(() => Int)
  price: number;

  @Field(() => merchantTypes.MerchantReference)
  merchant?: merchantTypes.MerchantReference;

  @Field(() => StockReference)
  stock?: StockReference;
}
