import { Repository } from 'sequelize-typescript';
import { Warehouse } from '../../models';
import { WarehousesRepository } from '../warehouses.repository.interface';
import { Op } from 'sequelize';
import { WarehouseCreationAttrs } from '../../interfaces';

export class WarehousesSequelizeRepository implements WarehousesRepository {
  constructor(private warehousesRepository: Repository<Warehouse>) {}

  findById(id: string): Promise<Warehouse> {
    return this.warehousesRepository.findByPk(id);
  }

  findAll(): Promise<Warehouse[]> {
    return this.warehousesRepository.findAll();
  }

  deleteById(id: string): Promise<number> {
    return this.warehousesRepository.destroy({
      where: {
        id,
      },
    });
  }

  findByIds(ids: string[]): Promise<Warehouse[]> {
    return this.warehousesRepository.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
    });
  }

  updateById(
    id: string,
    dto: WarehouseCreationAttrs,
  ): Promise<[affectedCount: number]> {
    return this.warehousesRepository.update(dto, {
      where: {
        id,
      },
    });
  }

  create(dto: WarehouseCreationAttrs): Promise<Warehouse> {
    return this.warehousesRepository.create(dto);
  }
}
