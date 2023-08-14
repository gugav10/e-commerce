import { Repository } from 'sequelize-typescript';
import { CitiesRepository } from '../cities.repository.interface';
import { City } from '../../models';
import { Op } from 'sequelize';

export class CitiesSequelizeRepository implements CitiesRepository {
  constructor(private citiesRepository: Repository<City>) {}

  findAll(): Promise<City[]> {
    return this.citiesRepository.findAll();
  }

  findById(id: string): Promise<City> {
    return this.citiesRepository.findByPk(id);
  }

  findByIds(ids: string[]): Promise<City[]> {
    return this.citiesRepository.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
    });
  }
}
