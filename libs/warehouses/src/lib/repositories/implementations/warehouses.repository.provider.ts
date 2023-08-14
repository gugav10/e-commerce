import { Injectable, Provider } from '@nestjs/common';
import { DataSource } from '@app/common';
import { WAREHOUSES_REPOSITORY_TOKEN } from '../warehouses.repository.interface';
import { ConfigModule } from '@nestjs/config';
import { WarehousesSequelizeRepository } from './warehouses.sequelize.repository';
import { InjectModel } from '@nestjs/sequelize';
import { Warehouse } from '../../models';
import { Repository } from 'sequelize-typescript';

export function provideWarehousesRepository(
  dataSource?: DataSource,
): Provider[] {
  return [
    {
      provide: WAREHOUSES_REPOSITORY_TOKEN,
      useFactory: async (
        depedenciesProvider: WarehousesRepoDependenciesProvider,
      ) => provideWarehousesRepositoryFactory(depedenciesProvider, dataSource),
      inject: [WarehousesRepoDependenciesProvider],
    },
    WarehousesRepoDependenciesProvider,
  ];
}

async function provideWarehousesRepositoryFactory(
  dependenciesProvider: WarehousesRepoDependenciesProvider,
  dataSource?: DataSource,
) {
  await ConfigModule.envVariablesLoaded;

  switch (dataSource) {
    case DataSource.SEQUELIZE:
    default:
      return new WarehousesSequelizeRepository(
        dependenciesProvider.sequelizeOrmRepository,
      );
  }
}

@Injectable()
export class WarehousesRepoDependenciesProvider {
  constructor(
    @InjectModel(Warehouse)
    public sequelizeOrmRepository: Repository<Warehouse>,
  ) {}
}
