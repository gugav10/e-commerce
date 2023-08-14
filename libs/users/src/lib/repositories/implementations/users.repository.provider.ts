import { Injectable, Provider } from '@nestjs/common';
import { USERS_REPOSITORY_TOKEN } from '../users.repository.interface';
import { UsersSequelizeRepository } from './users.sequelize.repository';
import { ConfigModule } from '@nestjs/config';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../../models';
import { Repository } from 'sequelize-typescript';
import { DataSource } from '@app/common';

export function provideUsersRepository(dataSource?: DataSource): Provider[] {
  return [
    {
      provide: USERS_REPOSITORY_TOKEN,
      useFactory: async (dependenciesProvider: UsersRepoDependenciesProvider) =>
        provideUsersRepositoryFactory(dependenciesProvider, dataSource),
      inject: [UsersRepoDependenciesProvider],
    },
    UsersRepoDependenciesProvider,
  ];
}

async function provideUsersRepositoryFactory(
  dependenciesProvider: UsersRepoDependenciesProvider,
  dataSource?: DataSource,
) {
  await ConfigModule.envVariablesLoaded;

  switch (dataSource) {
    case DataSource.SEQUELIZE:
    default:
      return new UsersSequelizeRepository(
        dependenciesProvider.sequelizeOrmRepository,
      );
  }
}

@Injectable()
export class UsersRepoDependenciesProvider {
  constructor(
    @InjectModel(User)
    public sequelizeOrmRepository: Repository<User>,
  ) {}
}
