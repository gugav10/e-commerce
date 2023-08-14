import { ObjectType, Field, GraphQLISODateTime } from '@nestjs/graphql';
import { IToken } from '../interfaces';
import { GraphQLString } from 'graphql';

@ObjectType()
export class Token implements Partial<IToken> {
  @Field(() => GraphQLString)
  accessToken: string;

  @Field(() => GraphQLString)
  refreshToken: string;

  @Field(() => GraphQLISODateTime)
  expiredAt: Date;
}
