import * as DataLoader from 'dataloader';
import { WarehouseStocksService } from '../warehouse-stocks.service';
import { Provider, Scope } from '@nestjs/common';

export const WAREHOUSE_STOCKS_DATALOADER_TOKEN = Symbol(
  'warehouse-stocks-dataloader-token',
);

export function createWarehouseStocksDataLoader(
  warehouseStocksService: WarehouseStocksService,
) {
  return new DataLoader(async (keys: string[]) => {
    const results = await warehouseStocksService.findByProductIds(keys);

    return keys.map((key) =>
      results.filter((result) => result.productId === key),
    );
  });
}

export function provideWarehouseStocksDataLoader(): Provider[] {
  return [
    {
      provide: WAREHOUSE_STOCKS_DATALOADER_TOKEN,
      useFactory: (warehouseStocksService: WarehouseStocksService) =>
        createWarehouseStocksDataLoader(warehouseStocksService),
      inject: [WarehouseStocksService],
      scope: Scope.REQUEST,
    },
  ];
}
