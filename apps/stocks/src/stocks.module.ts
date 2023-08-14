import { Module } from '@nestjs/common';
import { StocksController } from './stocks.controller';
import { StocksService } from './stocks.service';
import { StocksLibModule } from '@app/stocks-lib';
import { StocksResolver } from './stocks.resolver';
import { APP_FILTER, APP_PIPE, BaseExceptionFilter } from '@nestjs/core';
import {
  CommonZodValidationPipe,
  GqlExceptionHandler,
  HttpExceptionHandler,
  RpcExceptionHandler,
  cacheControlDirective,
  zodConfigValidation,
} from '@app/common';
import { HealthCheckController, HealthCheckModule } from '@app/health-check';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { z } from 'nestjs-zod/z';
import { SequelizeModule } from '@nestjs/sequelize';
import { Dialect } from 'sequelize';
import {
  WarehouseStocksModule,
  models as warehouseStockModels,
} from '@app/warehouse-stocks';
import { models as warehouseModels } from '@app/warehouses';
import { models as cityModels } from '@app/cities';
import { models as locationModels } from '@app/locations';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { provideWarehouseStocksDataLoader } from '@app/warehouse-stocks';

@Module({
  imports: [
    StocksLibModule,
    WarehouseStocksModule,
    HealthCheckModule.register(HealthCheckController),
    ConfigModule.forRoot({
      isGlobal: true,
      validate: zodConfigValidation(
        z.object({
          DB_SCHEMA: z.string().nonempty(),
          DB_DIALECT: z.string().nonempty(),
          DB_PORT: z.string().nonempty(),
          DB_DATABASE: z.string().nonempty(),
          DB_USERNAME: z.string().nonempty(),
          DB_PASSWORD: z.string().nonempty(),
          MESSAGE_QUEUE_URL: z.string().nonempty(),
        }),
      ),
      ignoreEnvFile: true,
    }),
    SequelizeModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        schema: configService.get<string>('DB_SCHEMA'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        host: configService.get<string>('DB_HOST'),
        dialect: configService.get<Dialect>('DB_DIALECT'),
        models: [
          warehouseStockModels.WarehouseStock,
          warehouseModels.Warehouse,
          cityModels.City,
          locationModels.Location,
        ],
      }),
      inject: [ConfigService],
    }),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        federation: 2,
      },
      transformAutoSchemaFile: true,
      buildSchemaOptions: {
        directives: [cacheControlDirective],
      },
    }),
  ],
  controllers: [StocksController],
  providers: [
    StocksService,
    StocksResolver,
    { provide: APP_PIPE, useClass: CommonZodValidationPipe },
    HttpExceptionHandler,
    GqlExceptionHandler,
    RpcExceptionHandler,
    {
      provide: APP_FILTER,
      useClass: BaseExceptionFilter,
    },
    ...provideWarehouseStocksDataLoader(),
  ],
})
export class StocksModule {}
