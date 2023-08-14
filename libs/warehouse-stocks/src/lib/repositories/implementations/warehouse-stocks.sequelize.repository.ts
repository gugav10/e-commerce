import { Repository } from 'sequelize-typescript';
import { WarehouseStocksRepository } from '../warehouse-stocks.repository.interface';
import { WarehouseStock } from '../../models';
import { Op } from 'sequelize';

export class WarehouseStocksSequelizeRepository
  implements WarehouseStocksRepository
{
  constructor(private warehouseStocksRepository: Repository<WarehouseStock>) {}

  findAll(): Promise<WarehouseStock[]> {
    return this.warehouseStocksRepository.findAll();
  }

  deleteById(id: string): Promise<number> {
    return this.warehouseStocksRepository.destroy({
      where: {
        id,
      },
    });
  }

  updateById(
    id: string,
    dto: Partial<WarehouseStock>,
  ): Promise<[affectedCount: number]> {
    return this.warehouseStocksRepository.update(dto, {
      where: {
        id,
      },
    });
  }

  create(dto: Partial<WarehouseStock>): Promise<WarehouseStock> {
    return this.warehouseStocksRepository.create(dto);
  }

  findById(id: string): Promise<WarehouseStock> {
    return this.warehouseStocksRepository.findByPk(id);
  }

  findByIds(ids: string[]): Promise<WarehouseStock[]> {
    return this.warehouseStocksRepository.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
    });
  }

  findByProductId(productId: string): Promise<WarehouseStock[]> {
    return this.warehouseStocksRepository.findAll({
      where: {
        productId,
      },
    });
  }

  findByProductIds(productIds: string[]): Promise<WarehouseStock[]> {
    return this.warehouseStocksRepository.findAll({
      where: {
        productId: {
          [Op.in]: productIds,
        },
      },
    });
  }
}
