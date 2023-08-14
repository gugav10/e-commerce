import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import {
  OrdersLibModule,
  models as orderModels,
  provideUserOrdersDataLoader,
} from '@app/orders-lib';
import { HealthCheckController, HealthCheckModule } from '@app/health-check';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  MerchantReference,
  ProductReference,
  StockReference,
  cacheControlDirective,
  zodConfigValidation,
} from '@app/common';
import { z } from 'nestjs-zod/z';
import { SequelizeModule } from '@nestjs/sequelize';
import { Dialect } from 'sequelize';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { OrdersResolver } from './orders.resolver';

@Module({
  imports: [
    OrdersLibModule,
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
        models: [orderModels.Order],
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
        orphanedTypes: [MerchantReference, StockReference, ProductReference],
      },
    }),
  ],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersResolver, ...provideUserOrdersDataLoader()],
})
export class OrdersModule {}
