import { Repository } from '@app/common';
import { Order } from '../entities';

export type OrdersRepository = Repository<Order> & {
  findByUserIds(ids: string[]): Promise<Order[]>;
  findByUserIdsAndProductIds(compositeKeys: string[]): Promise<Order[]>;
};

export const ORDERS_REPOSITORY_TOKEN = Symbol('orders-repository-token');
