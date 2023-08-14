import { Inject, Injectable } from '@nestjs/common';
import { ORDERS_REPOSITORY_TOKEN, OrdersRepository } from './repositories';
import { Order } from './entities';

@Injectable()
export class OrdersLibService {
  constructor(
    @Inject(ORDERS_REPOSITORY_TOKEN) private ordersRepository: OrdersRepository,
  ) {}

  async findByUserIds(userIds: string[]): Promise<Order[]> {
    return this.ordersRepository.findByUserIds(userIds);
  }

  async findById(id: string): Promise<Order> {
    return this.ordersRepository.findById(id);
  }
}
