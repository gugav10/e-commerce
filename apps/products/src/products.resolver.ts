import {
  Args,
  ID,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import {
  CreateProductInput,
  ProductsLibService,
  types,
} from '@app/products-lib';
import {
  CurrentUser,
  GqlAuthGuard,
  GqlRolesGuard,
  GraphQLReferenceType,
  Roles,
  TypeReferencePayload,
  UserPayload,
} from '@app/common';
import { types as merchantTypes } from '@app/merchants';
import { UseGuards } from '@nestjs/common';
import { Role } from '@app/users';
import { StockReference } from '@app/common';

@Resolver(() => types.Product)
export class ProductsResolver {
  constructor(private readonly productsService: ProductsLibService) {}

  @Query(() => [types.Product], { name: 'products' })
  findAll() {
    return this.productsService.findAll();
  }

  @Query(() => types.Product, { name: 'product' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.productsService.findById(id);
  }

  @Roles(Role.MERCHANT)
  @UseGuards(GqlAuthGuard, GqlRolesGuard)
  @Mutation(() => types.Product)
  createProduct(
    @Args('input') input: CreateProductInput,
    @CurrentUser() { data }: UserPayload,
  ): Promise<types.Product> {
    return this.productsService.create(input, data.id);
  }

  @ResolveField(() => GraphQLReferenceType.MERCHANT)
  merchant(
    @Parent() product: types.Product,
  ): TypeReferencePayload<merchantTypes.MerchantReference> {
    return {
      __typename: GraphQLReferenceType.MERCHANT,
      userId: product.merchantId,
    };
  }

  @ResolveField(() => GraphQLReferenceType.STOCK)
  stock(
    @Parent() product: types.Product,
  ): TypeReferencePayload<StockReference> {
    return {
      __typename: GraphQLReferenceType.STOCK,
      productId: product.id,
    };
  }
}
