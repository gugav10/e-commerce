import {
  Args,
  ID,
  Parent,
  ResolveField,
  ResolveReference,
  Resolver,
  Query,
} from '@nestjs/graphql';
import { StocksLibService } from '@app/stocks-lib';
import { types as stockTypes } from '@app/stocks-lib';
import { StockReference, TypeReferencePayload } from '@app/common';
import * as DataLoader from 'dataloader';
import {
  WAREHOUSE_STOCKS_DATALOADER_TOKEN,
  entities as warehouseStocksEntities,
} from '@app/warehouse-stocks';
import { GraphQLBoolean, GraphQLInt } from 'graphql';
import { Inject } from '@nestjs/common';

@Resolver(() => stockTypes.Stock)
export class StocksResolver {
  constructor(
    private readonly stocksService: StocksLibService,
    @Inject(WAREHOUSE_STOCKS_DATALOADER_TOKEN)
    private readonly warehouseStocksLoader: DataLoader<
      string,
      warehouseStocksEntities.WarehouseStock[]
    >,
  ) {}

  @Query(() => stockTypes.Stock)
  async stock(
    @Args('productId', { type: () => ID }) productId: string,
  ): Promise<stockTypes.Stock> {
    const stocks = await this.warehouseStocksLoader.load(productId);

    if (stocks?.length < 1) {
      return null;
    }

    return {
      productId,
      stocks,
    };
  }

  @ResolveReference()
  async resolveReference(
    reference: TypeReferencePayload<StockReference>,
  ): Promise<stockTypes.Stock> {
    const stocks = await this.warehouseStocksLoader.load(reference.productId);

    if (stocks?.length < 1) {
      return null;
    }

    return {
      productId: reference.productId,
      stocks,
    };
  }

  @ResolveField(() => GraphQLInt)
  stockAmount(@Parent() stock: stockTypes.Stock): number {
    return this.stocksService.getStockAmount(stock.stocks);
  }

  @ResolveField(() => GraphQLBoolean)
  inStock(@Parent() stock: stockTypes.Stock): boolean {
    return this.stocksService.isInStock(stock.stocks);
  }
}
