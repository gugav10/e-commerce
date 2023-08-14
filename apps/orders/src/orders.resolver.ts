import {
  Args,
  ID,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { OrdersLibService, entities, types } from '@app/orders-lib';
import {
  CurrentUser,
  GqlAuthGuard,
  GqlRolesGuard,
  GraphQLReferenceType,
  ProductReference,
  Roles,
  TypeReferencePayload,
  UserPayload,
} from '@app/common';
import { Role } from '@app/users';
import { Inject, UseGuards } from '@nestjs/common';
import { USER_ORDERS_DATALOADER_TOKEN } from '@app/orders-lib';
import * as DataLoader from 'dataloader';

@Resolver(() => types.Order)
export class OrdersResolver {
  constructor(
    private readonly ordersService: OrdersLibService,
    @Inject(USER_ORDERS_DATALOADER_TOKEN)
    private readonly userOrdersLoader: DataLoader<string, entities.Order>,
  ) {}

  @Roles(Role.CUSTOMER)
  @UseGuards(GqlAuthGuard, GqlRolesGuard)
  @Query(() => [types.Order])
  async userOrders(@CurrentUser() { data }: UserPayload) {
    return this.userOrdersLoader.load(data.id);
  }

  @Query(() => types.Order)
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.ordersService.findById(id);
  }

  //   @Roles(Role.CUSTOMER)
  //   @UseGuards(GqlAuthGuard, GqlRolesGuard)
  //   @Mutation(() => types.Order)
  //   createOrder(
  //     @Args('input') input: CreateProductInput,
  //     @CurrentUser() { data }: UserPayload,
  //   ): Promise<types.Order> {
  //     return this.ordersService.create(input, data.id);
  //   }

  @ResolveField(() => GraphQLReferenceType.PRODUCT)
  product(
    @Parent() order: types.Order,
  ): TypeReferencePayload<ProductReference> {
    return {
      __typename: GraphQLReferenceType.PRODUCT,
      id: order.productId,
    };
  }
}
