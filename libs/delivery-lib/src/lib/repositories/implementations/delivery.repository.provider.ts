import { Injectable, Provider } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { InjectModel } from '@nestjs/sequelize';
import { Delivery } from '../../models';
import { Repository } from 'sequelize-typescript';
import { DataSource } from '@app/common';
import { DELIVERY_REPOSITORY_TOKEN } from '../delivery.repository.interface';
import { DeliverySequelizeRepository } from './delivery.sequelize.repository';

export function provideDeliveryRepository(dataSource?: DataSource): Provider[] {
  return [
    {
      provide: DELIVERY_REPOSITORY_TOKEN,
      useFactory: async (
        dependenciesProvider: DeliveryRepoDependenciesProvider,
      ) => provideDeliveryRepositoryFactory(dependenciesProvider, dataSource),
      inject: [DeliveryRepoDependenciesProvider],
    },
    DeliveryRepoDependenciesProvider,
  ];
}

async function provideDeliveryRepositoryFactory(
  dependenciesProvider: DeliveryRepoDependenciesProvider,
  dataSource?: DataSource,
) {
  await ConfigModule.envVariablesLoaded;

  switch (dataSource) {
    case DataSource.SEQUELIZE:
    default:
      return new DeliverySequelizeRepository(
        dependenciesProvider.sequelizeOrmRepository,
      );
  }
}

@Injectable()
export class DeliveryRepoDependenciesProvider {
  constructor(
    @InjectModel(Delivery)
    public sequelizeOrmRepository: Repository<Delivery>,
  ) {}
}
