import { Repository } from 'sequelize-typescript';
import { LocationsRepository } from '../locations.repository.interface';
import { Location } from '../../models';
import { Op } from 'sequelize';
import { LocationCreationAttrs } from '../../interfaces';

export class LocationsSequelizeRepository implements LocationsRepository {
  constructor(private locationsRepository: Repository<Location>) {}

  findById(id: string): Promise<Location> {
    return this.locationsRepository.findByPk(id);
  }

  findAll(): Promise<Location[]> {
    return this.locationsRepository.findAll();
  }

  deleteById(id: string): Promise<number> {
    return this.locationsRepository.destroy({
      where: {
        id,
      },
    });
  }

  findByIds(ids: string[]): Promise<Location[]> {
    return this.locationsRepository.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
    });
  }

  updateById(
    id: string,
    dto: LocationCreationAttrs,
  ): Promise<[affectedCount: number]> {
    return this.locationsRepository.update(dto, {
      where: {
        id,
      },
    });
  }

  create(dto: LocationCreationAttrs): Promise<Location> {
    return this.locationsRepository.create(dto);
  }
}
