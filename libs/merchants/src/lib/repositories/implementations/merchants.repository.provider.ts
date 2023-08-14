import { DataSource } from '@app/common';
import { MERCHANTS_REPOSITORY_TOKEN } from '../merchants.repository.interface';
import { Injectable, Provider } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { InjectModel } from '@nestjs/sequelize';
import { Merchant } from '../../models';
import { Repository } from 'sequelize-typescript';
import { MerchantsSequelizeRepository } from './merchants.sequelize.repository';

export function provideMerchantsRepository(
  dataSource?: DataSource,
): Provider[] {
  return [
    {
      provide: MERCHANTS_REPOSITORY_TOKEN,
      useFactory: async (
        dependenciesProvider: MerchantsRepoDependenciesProvider,
      ) => provideMerchantsRepositoryFactory(dependenciesProvider, dataSource),
      inject: [MerchantsRepoDependenciesProvider],
    },
    MerchantsRepoDependenciesProvider,
  ];
}

async function provideMerchantsRepositoryFactory(
  dependenciesProvider: MerchantsRepoDependenciesProvider,
  dataSource?: DataSource,
) {
  await ConfigModule.envVariablesLoaded;

  switch (dataSource) {
    case DataSource.SEQUELIZE:
    default:
      return new MerchantsSequelizeRepository(
        dependenciesProvider.sequelizeOrmRepository,
      );
  }
}

@Injectable()
export class MerchantsRepoDependenciesProvider {
  constructor(
    @InjectModel(Merchant)
    public sequelizeOrmRepository: Repository<Merchant>,
  ) {}
}
