import { DataSource } from '@app/common';
import { Injectable, Provider } from '@nestjs/common';
import { CITIES_REPOSITORY_TOKEN } from '../cities.repository.interface';
import { ConfigModule } from '@nestjs/config';
import { CitiesSequelizeRepository } from './cities.sequelize.repository';
import { City } from '../../models';
import { InjectModel } from '@nestjs/sequelize';
import { Repository } from 'sequelize-typescript';

export function provideCitiesRepository(dataSource?: DataSource): Provider[] {
  return [
    {
      provide: CITIES_REPOSITORY_TOKEN,
      useFactory: async (depedenciesProvider: CitiesRepoDependenciesProvider) =>
        provideCitiesRepositoryFactory(depedenciesProvider, dataSource),
      inject: [CitiesRepoDependenciesProvider],
    },
    CitiesRepoDependenciesProvider,
  ];
}

async function provideCitiesRepositoryFactory(
  dependenciesProvider: CitiesRepoDependenciesProvider,
  dataSource?: DataSource,
) {
  await ConfigModule.envVariablesLoaded;

  switch (dataSource) {
    case DataSource.SEQUELIZE:
    default:
      return new CitiesSequelizeRepository(
        dependenciesProvider.sequelizeOrmRepository,
      );
  }
}

@Injectable()
export class CitiesRepoDependenciesProvider {
  constructor(
    @InjectModel(City)
    public sequelizeOrmRepository: Repository<City>,
  ) {}
}
