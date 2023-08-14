import { Injectable, Provider } from '@nestjs/common';
import { TokensSequelizeRepository } from './tokens.sequelize.repository';
import { ConfigModule } from '@nestjs/config';
import { InjectModel } from '@nestjs/sequelize';
import { Token } from '../../models';
import { Repository } from 'sequelize-typescript';
import { DataSource } from '@app/common';
import { TOKENS_REPOSITORY_TOKEN } from '../tokens.repository.interface';

export function provideTokensRepository(dataSource?: DataSource): Provider[] {
  return [
    {
      provide: TOKENS_REPOSITORY_TOKEN,
      useFactory: async (
        dependenciesProvider: TokensRepoDependenciesProvider,
      ) => provideTokensRepositoryFactory(dependenciesProvider, dataSource),
      inject: [TokensRepoDependenciesProvider],
    },
    TokensRepoDependenciesProvider,
  ];
}

async function provideTokensRepositoryFactory(
  dependenciesProvider: TokensRepoDependenciesProvider,
  dataSource?: DataSource,
) {
  await ConfigModule.envVariablesLoaded;

  switch (dataSource) {
    case DataSource.SEQUELIZE:
    default:
      return new TokensSequelizeRepository(
        dependenciesProvider.sequelizeOrmRepository,
      );
  }
}

@Injectable()
export class TokensRepoDependenciesProvider {
  constructor(
    @InjectModel(Token)
    public sequelizeOrmRepository: Repository<Token>,
  ) {}
}
