import {
  Args,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import {
  AuthLibService,
  AuthResponse,
  RegisterInput,
  LoginInput,
} from '@app/auth-lib';
import {
  types as userTypes,
  entities as userEntities,
  USERS_DATALOADER_TOKEN,
} from '@app/users';
import { Inject, UsePipes } from '@nestjs/common';
import { ZodValidationPipe } from 'nestjs-zod';
import * as DataLoader from 'dataloader';

@UsePipes(ZodValidationPipe)
@Resolver(() => AuthResponse)
export class AuthResolver {
  constructor(
    private authService: AuthLibService,
    @Inject(USERS_DATALOADER_TOKEN)
    private readonly usersLoader: DataLoader<string, userEntities.User>,
  ) {}

  @Mutation(() => AuthResponse)
  login(@Args('input') input: LoginInput): Promise<AuthResponse> {
    return this.authService.login(input);
  }

  @Mutation(() => AuthResponse)
  register(@Args('input') input: RegisterInput): Promise<AuthResponse> {
    return this.authService.register(input);
  }

  @ResolveField(() => userTypes.User)
  user(@Parent() authResponse: AuthResponse): Promise<userEntities.User> {
    return this.usersLoader.load(authResponse.userId);
  }
}
