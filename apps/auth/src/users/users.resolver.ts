import {
  Resolver,
  Query,
  Mutation,
  Args,
  ID,
  Parent,
  ResolveField,
  ResolveReference,
} from '@nestjs/graphql';
import {
  Role,
  USERS_DATALOADER_TOKEN,
  UpdateUserInput,
  UsersService,
  types,
  entities as userEntities,
} from '@app/users';
import {
  entities as customerEntities,
  CUSTOMERS_DATALOADER_TOKEN,
} from '@app/customers';
import { Inject, UseGuards } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import {
  MERCHANTS_DATALOADER_TOKEN,
  entities as merchantEntities,
} from '@app/merchants';
import {
  CurrentUser,
  GqlAuthGuard,
  GqlRolesGuard,
  Roles,
  UserPayload,
} from '@app/common';

@Resolver(() => types.User)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    @Inject(CUSTOMERS_DATALOADER_TOKEN)
    private readonly customersLoader: DataLoader<
      string,
      customerEntities.Customer
    >,
    @Inject(MERCHANTS_DATALOADER_TOKEN)
    private readonly merchantsLoader: DataLoader<
      string,
      merchantEntities.Merchant
    >,
    @Inject(USERS_DATALOADER_TOKEN)
    private readonly usersLoader: DataLoader<string, userEntities.User>,
  ) {}

  @Roles(Role.MERCHANT)
  @UseGuards(GqlAuthGuard, GqlRolesGuard)
  @Query(() => [types.User], { name: 'users' })
  findAll() {
    return this.usersService.findAll();
  }

  @Query(() => types.User, { name: 'user' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.usersService.findById(id);
  }

  @Mutation(() => types.User)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.usersService.updateById(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => types.User)
  removeUser(@Args('id', { type: () => ID }) id: string) {
    return this.usersService.deleteById(id);
  }

  @ResolveField(() => types.Profile)
  profile(@Parent() user: types.User): Promise<typeof types.Profile> {
    switch (user.role) {
      case Role.CUSTOMER:
        return this.customersLoader.load(user.id);
      case Role.MERCHANT:
        return this.merchantsLoader.load(user.id);
      default:
        return null;
    }
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => types.User)
  async currentUser(
    @CurrentUser() { data }: UserPayload,
  ): Promise<userEntities.User> {
    return data;
  }

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }) {
    return this.usersLoader.load(reference.id);
  }
}
