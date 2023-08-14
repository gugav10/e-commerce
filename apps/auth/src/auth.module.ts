import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from './users/users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { provideUsersDataLoader, models as userModels } from '@app/users';
import { models as tokenModels } from '@app/tokens';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Dialect } from 'sequelize';
import { HealthCheckController, HealthCheckModule } from '@app/health-check';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import {
  BaseAppSchema,
  BaseExceptionFilter,
  CommonZodValidationPipe,
  GqlExceptionHandler,
  HttpExceptionHandler,
  RpcExceptionHandler,
  cacheControlDirective,
  zodConfigValidation,
} from '@app/common';
import { AuthResolver } from './auth.resolver';
import { InMemoryLRUCache } from '@apollo/utils.keyvaluecache';
import responseCachePlugin from '@apollo/server-plugin-response-cache';
import { models as customerModels } from '@app/customers';
import { models as merchantModels } from '@app/merchants';
import { AuthLibModule } from '@app/auth-lib';
import { MerchantsModule } from './merchants/merchants.module';
import { CustomersModule } from './customers/customers.module';

@Module({
  controllers: [AuthController],
  providers: [
    { provide: APP_PIPE, useClass: CommonZodValidationPipe },
    HttpExceptionHandler,
    GqlExceptionHandler,
    RpcExceptionHandler,
    {
      provide: APP_FILTER,
      useClass: BaseExceptionFilter,
    },
    AuthService,
    AuthResolver,
    ...provideUsersDataLoader(),
  ],
  imports: [
    AuthLibModule,
    UsersModule,
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
          userModels.User,
          tokenModels.Token,
          customerModels.Customer,
          merchantModels.Merchant,
        ],
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      validate: zodConfigValidation(BaseAppSchema),
      ignoreEnvFile: true,
    }),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        federation: 2,
      },
      cache: new InMemoryLRUCache({
        maxSize: Math.pow(2, 20) * 100,
        ttl: 300,
      }),
      transformAutoSchemaFile: true,
      buildSchemaOptions: {
        directives: [cacheControlDirective],
      },
      plugins: [responseCachePlugin()],
    }),
    HealthCheckModule.register(HealthCheckController),
    CustomersModule,
    MerchantsModule,
  ],
})
export class AuthModule {}
