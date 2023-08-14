import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { IWarehouse } from '../interfaces';
import { types as locationTypes } from '@app/locations';
import { MerchantReference } from '@app/common';

@ObjectType()
@Directive('@key(fields: "id")')
export class Warehouse implements IWarehouse {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  merchantId: string;

  @Field(() => ID)
  locationId: string;

  @Field(() => MerchantReference, { nullable: true })
  merchant?: MerchantReference;

  @Field(() => locationTypes.Location, { nullable: true })
  location?: locationTypes.Location;
}
