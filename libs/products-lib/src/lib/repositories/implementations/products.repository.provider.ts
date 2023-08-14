import { DataSource } from '@app/common';
import { Injectable, Provider } from '@nestjs/common';
import { PRODUCTS_REPOSITORY_TOKEN } from '../products.repository.interface';
import { ConfigModule } from '@nestjs/config';
import { ProductsSequelizeRepository } from './products.sequelize.repository';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from '../../models';
import { Repository } from 'sequelize-typescript';

export function provideProductsRepository(dataSource?: DataSource): Provider[] {
  return [
    {
      provide: PRODUCTS_REPOSITORY_TOKEN,
      useFactory: async (
        depedenciesProvider: ProductsRepoDependenciesProvider,
      ) => provideProductsRepositoryFactory(depedenciesProvider, dataSource),
      inject: [ProductsRepoDependenciesProvider],
    },
    ProductsRepoDependenciesProvider,
  ];
}

async function provideProductsRepositoryFactory(
  dependenciesProvider: ProductsRepoDependenciesProvider,
  dataSource?: DataSource,
) {
  await ConfigModule.envVariablesLoaded;

  switch (dataSource) {
    case DataSource.SEQUELIZE:
    default:
      return new ProductsSequelizeRepository(
        dependenciesProvider.sequelizeOrmRepository,
      );
  }
}

@Injectable()
export class ProductsRepoDependenciesProvider {
  constructor(
    @InjectModel(Product)
    public sequelizeOrmRepository: Repository<Product>,
  ) {}
}
