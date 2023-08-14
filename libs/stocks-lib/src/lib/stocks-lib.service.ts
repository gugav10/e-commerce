import { Injectable } from '@nestjs/common';
import { WarehouseStocksService } from '@app/warehouse-stocks';
import { WarehouseStock } from '../../../warehouse-stocks/src/lib/entities';

@Injectable()
export class StocksLibService {
  constructor(
    private readonly warehouseStocksService: WarehouseStocksService,
  ) {}

  getStocksWarehouseStocks(productIds: string[]) {
    return this.warehouseStocksService.findByProductIds(productIds);
  }

  getStockWarehouseStocks(productId: string) {
    return this.warehouseStocksService.findByProductId(productId);
  }

  getStockAmount(warehouseStocks: WarehouseStock[]): number {
    return warehouseStocks.reduce((sum, s) => sum + s.quantity, 0);
  }

  isInStock(warehouseStocks: WarehouseStock[]): boolean {
    return this.getStockAmount(warehouseStocks) > 0;
  }
}
