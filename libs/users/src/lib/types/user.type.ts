import {
  ObjectType,
  Field,
  ID,
  GraphQLISODateTime,
  Directive,
} from '@nestjs/graphql';
import { IUser } from '../interfaces';
import { GraphQLBoolean, GraphQLString } from 'graphql';
import { Role } from '../enums';
import { Profile } from './profile.type';

@ObjectType()
@Directive('@key(fields: "id")')
export class User implements Partial<IUser> {
  @Field(() => ID)
  id: string;

  @Field(() => GraphQLString)
  @Directive('@cacheControl(maxAge: 20)')
  username: string;

  @Field(() => GraphQLString)
  email: string;

  @Field(() => Role)
  role: Role;

  @Field(() => GraphQLBoolean)
  isActive: boolean;

  @Field(() => GraphQLBoolean)
  isVerified: boolean;

  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @Field(() => Profile, { name: 'profile', nullable: true })
  profile?: typeof Profile;
}
