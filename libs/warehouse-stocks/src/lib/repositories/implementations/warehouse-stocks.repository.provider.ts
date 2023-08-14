import { Injectable, Provider } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { InjectModel } from '@nestjs/sequelize';
import { Repository } from 'sequelize-typescript';
import { DataSource } from '@app/common';
import { WAREHOUSE_STOCKS_REPOSITORY_TOKEN } from '../warehouse-stocks.repository.interface';
import { WarehouseStocksSequelizeRepository } from './warehouse-stocks.sequelize.repository';
import { WarehouseStock } from '../../models';

export function provideWarehouseStocksRepository(
  dataSource?: DataSource,
): Provider[] {
  return [
    {
      provide: WAREHOUSE_STOCKS_REPOSITORY_TOKEN,
      useFactory: async (
        dependenciesProvider: WarehouseStocksRepoDependenciesProvider,
      ) =>
        provideWarehouseStocksRepositoryFactory(
          dependenciesProvider,
          dataSource,
        ),
      inject: [WarehouseStocksRepoDependenciesProvider],
    },
    WarehouseStocksRepoDependenciesProvider,
  ];
}

async function provideWarehouseStocksRepositoryFactory(
  dependenciesProvider: WarehouseStocksRepoDependenciesProvider,
  dataSource?: DataSource,
) {
  await ConfigModule.envVariablesLoaded;

  switch (dataSource) {
    case DataSource.SEQUELIZE:
    default:
      return new WarehouseStocksSequelizeRepository(
        dependenciesProvider.sequelizeOrmRepository,
      );
  }
}

@Injectable()
export class WarehouseStocksRepoDependenciesProvider {
  constructor(
    @InjectModel(WarehouseStock)
    public sequelizeOrmRepository: Repository<WarehouseStock>,
  ) {}
}
