import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { ILocation } from '../interfaces';
import { types as cityTypes } from '@app/cities';

@ObjectType()
@Directive('@key(fields: "id")')
export class Location implements ILocation {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  cityId: string;

  @Field(() => cityTypes.City, { nullable: true })
  city?: cityTypes.City;
}
