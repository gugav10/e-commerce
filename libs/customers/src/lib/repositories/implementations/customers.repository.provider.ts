import { DataSource } from '@app/common';
import { Injectable, Provider } from '@nestjs/common';
import { CUSTOMERS_REPOSITORY_TOKEN } from '../customers.repository.interface';
import { InjectModel } from '@nestjs/sequelize';
import { Customer } from '../../models';
import { Repository } from 'sequelize-typescript';
import { ConfigModule } from '@nestjs/config';
import { CustomersSequelizeRepository } from './customers.sequelize.repository';

export function provideCustomersRepository(
  dataSource?: DataSource,
): Provider[] {
  return [
    {
      provide: CUSTOMERS_REPOSITORY_TOKEN,
      useFactory: async (
        dependenciesProvider: CustomersRepoDependenciesProvider,
      ) => provideCustomersRepositoryFactory(dependenciesProvider, dataSource),
      inject: [CustomersRepoDependenciesProvider],
    },
    CustomersRepoDependenciesProvider,
  ];
}

async function provideCustomersRepositoryFactory(
  dependenciesProvider: CustomersRepoDependenciesProvider,
  dataSource?: DataSource,
) {
  await ConfigModule.envVariablesLoaded;

  switch (dataSource) {
    case DataSource.SEQUELIZE:
    default:
      return new CustomersSequelizeRepository(
        dependenciesProvider.sequelizeOrmRepository,
      );
  }
}

@Injectable()
export class CustomersRepoDependenciesProvider {
  constructor(
    @InjectModel(Customer)
    public sequelizeOrmRepository: Repository<Customer>,
  ) {}
}
