import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { HealthCheckController, HealthCheckModule } from '@app/health-check';
import {
  BaseExceptionFilter,
  CommonZodValidationPipe,
  GqlExceptionHandler,
  HttpExceptionHandler,
  RpcExceptionHandler,
  StockReference,
  cacheControlDirective,
  zodConfigValidation,
} from '@app/common';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { ProductsLibModule } from '@app/products-lib';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Dialect } from 'sequelize';
import { z } from 'nestjs-zod/z';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { models as productModels } from '@app/products-lib';
import { ProductsResolver } from './products.resolver';
import { types as merchantTypes } from '@app/merchants';

@Module({
  controllers: [ProductsController],
  providers: [
    ProductsResolver,
    ProductsService,
    { provide: APP_PIPE, useClass: CommonZodValidationPipe },
    HttpExceptionHandler,
    GqlExceptionHandler,
    RpcExceptionHandler,
    {
      provide: APP_FILTER,
      useClass: BaseExceptionFilter,
    },
  ],
  imports: [
    ProductsLibModule,
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
        models: [productModels.Product],
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
        orphanedTypes: [merchantTypes.MerchantReference, StockReference],
      },
    }),
  ],
})
export class ProductsModule {}
