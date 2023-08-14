import { Inject, Injectable } from '@nestjs/common';
import {
  WAREHOUSE_STOCKS_REPOSITORY_TOKEN,
  WarehouseStocksRepository,
} from './repositories';

@Injectable()
export class WarehouseStocksService {
  constructor(
    @Inject(WAREHOUSE_STOCKS_REPOSITORY_TOKEN)
    private warehouseStocksRepository: WarehouseStocksRepository,
  ) {}

  findByProductId(productId: string) {
    return this.warehouseStocksRepository.findByProductId(productId);
  }

  findByProductIds(productIds: string[]) {
    return this.warehouseStocksRepository.findByProductIds(productIds);
  }
}
