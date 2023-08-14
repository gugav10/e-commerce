import { Repository } from '@app/common';
import { WarehouseStock } from '../entities';

export interface WarehouseStocksRepository extends Repository<WarehouseStock> {
  findByProductId(productId: string): Promise<WarehouseStock[]>;
  findByProductIds(productIds: string[]): Promise<WarehouseStock[]>;
}

export const WAREHOUSE_STOCKS_REPOSITORY_TOKEN = Symbol(
  'warehouse-stocks-repository-token',
);
