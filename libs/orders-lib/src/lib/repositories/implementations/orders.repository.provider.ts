import { Injectable, Provider } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { InjectModel } from '@nestjs/sequelize';
import { Order } from '../../models';
import { Repository } from 'sequelize-typescript';
import { DataSource } from '@app/common';
import { ORDERS_REPOSITORY_TOKEN } from '../orders.repository.interface';
import { OrdersSequelizeRepository } from './orders.sequelize.repository';

export function provideOrdersRepository(dataSource?: DataSource): Provider[] {
  return [
    {
      provide: ORDERS_REPOSITORY_TOKEN,
      useFactory: async (
        dependenciesProvider: OrdersRepoDependenciesProvider,
      ) => provideOrdersRepositoryFactory(dependenciesProvider, dataSource),
      inject: [OrdersRepoDependenciesProvider],
    },
    OrdersRepoDependenciesProvider,
  ];
}

async function provideOrdersRepositoryFactory(
  dependenciesProvider: OrdersRepoDependenciesProvider,
  dataSource?: DataSource,
) {
  await ConfigModule.envVariablesLoaded;

  switch (dataSource) {
    case DataSource.SEQUELIZE:
    default:
      return new OrdersSequelizeRepository(
        dependenciesProvider.sequelizeOrmRepository,
      );
  }
}

@Injectable()
export class OrdersRepoDependenciesProvider {
  constructor(
    @InjectModel(Order)
    public sequelizeOrmRepository: Repository<Order>,
  ) {}
}
