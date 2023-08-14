import { Injectable, Provider } from '@nestjs/common';
import { DataSource } from '@app/common';
import { LOCATIONS_REPOSITORY_TOKEN } from '../locations.repository.interface';
import { ConfigModule } from '@nestjs/config';
import { InjectModel } from '@nestjs/sequelize';
import { Location } from '../../models';
import { Repository } from 'sequelize-typescript';
import { LocationsSequelizeRepository } from './locations.sequelize.repository';

export function provideLocationsRepository(
  dataSource?: DataSource,
): Provider[] {
  return [
    {
      provide: LOCATIONS_REPOSITORY_TOKEN,
      useFactory: async (
        depedenciesProvider: LocationsRepoDependenciesProvider,
      ) => provideLocationsRepositoryFactory(depedenciesProvider, dataSource),
      inject: [LocationsRepoDependenciesProvider],
    },
    LocationsRepoDependenciesProvider,
  ];
}

async function provideLocationsRepositoryFactory(
  dependenciesProvider: LocationsRepoDependenciesProvider,
  dataSource?: DataSource,
) {
  await ConfigModule.envVariablesLoaded;

  switch (dataSource) {
    case DataSource.SEQUELIZE:
    default:
      return new LocationsSequelizeRepository(
        dependenciesProvider.sequelizeOrmRepository,
      );
  }
}

@Injectable()
export class LocationsRepoDependenciesProvider {
  constructor(
    @InjectModel(Location)
    public sequelizeOrmRepository: Repository<Location>,
  ) {}
}
