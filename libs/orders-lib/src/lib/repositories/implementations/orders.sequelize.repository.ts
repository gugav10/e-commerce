import { Repository } from 'sequelize-typescript';
import { OrdersRepository } from '../orders.repository.interface';
import { Order } from '../../models';
import { Op } from 'sequelize';
import { OrderCreationAttrs } from '../../interfaces';
import { deComposeKeys } from '@app/common';

export class OrdersSequelizeRepository implements OrdersRepository {
  constructor(private ordersRepository: Repository<Order>) {}

  findByIds(ids: string[]): Promise<Order[]> {
    return this.ordersRepository.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
    });
  }

  updateById(
    id: string,
    dto: Partial<Order>,
  ): Promise<[affectedCount: number]> {
    return this.ordersRepository.update(dto, {
      where: {
        id,
      },
    });
  }

  create(dto: OrderCreationAttrs): Promise<Order> {
    return this.ordersRepository.create(dto);
  }

  findById(id: string): Promise<Order> {
    return this.ordersRepository.findByPk(id);
  }

  findAll(): Promise<Order[]> {
    return this.ordersRepository.findAll();
  }

  deleteById(id: string): Promise<number> {
    return this.ordersRepository.destroy({
      where: {
        id,
      },
    });
  }

  findByUserIds(userIds: string[]): Promise<Order[]> {
    return this.ordersRepository.findAll({
      where: {
        userId: {
          [Op.in]: userIds,
        },
      },
    });
  }

  findByUserIdsAndProductIds(compositeKeys: string[]) {
    const [userIds, productIds] = deComposeKeys(compositeKeys);
    return this.ordersRepository.findAll({
      where: {
        userId: {
          [Op.in]: userIds,
        },
        productId: {
          [Op.in]: productIds,
        },
      },
    });
  }
}
