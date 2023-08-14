import { Field, ID, ObjectType } from '@nestjs/graphql';
import { types as userTypes } from '@app/users';
import { types as tokenTypes } from '@app/tokens';

@ObjectType()
export class AuthResponse {
  @Field(() => ID)
  userId: string;

  @Field(() => userTypes.User)
  user?: userTypes.User;

  @Field(() => tokenTypes.Token)
  credentials?: tokenTypes.Token;
}
