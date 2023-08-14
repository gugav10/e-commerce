import { Repository } from '@app/common';
import { Warehouse } from '../entities';

export type WarehousesRepository = Repository<Warehouse>;

export const WAREHOUSES_REPOSITORY_TOKEN = Symbol(
  'warehouses-repository-token',
);
