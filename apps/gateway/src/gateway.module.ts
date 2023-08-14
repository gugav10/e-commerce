import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { DevtoolsModule } from '@nestjs/devtools-integration';
import { GatewayController } from './gateway.controller';
import { GatewayService } from './gateway.service';
import { GatewayAppSchema, GatewayLibModule } from '@app/gateway-lib';
import { ConfigModule } from '@nestjs/config';
import { HealthCheckController, HealthCheckModule } from '@app/health-check';
import { APP_PIPE } from '@nestjs/core';
import {
  AuthRpcMiddleware,
  CommonZodValidationPipe,
  zodConfigValidation,
} from '@app/common';
import { express as voyagerMiddleware } from 'graphql-voyager/middleware';
import { AuthRpcModule } from '@app/auth-rpc';

@Module({
  imports: [
    DevtoolsModule.register({
      http: process.env.NODE_ENV !== 'production',
      port: 8000,
    }),
    GatewayLibModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validate: zodConfigValidation(GatewayAppSchema),
      ignoreEnvFile: true,
    }),
    AuthRpcModule,
    HealthCheckModule.register(HealthCheckController),
  ],
  controllers: [GatewayController],
  providers: [
    GatewayService,
    { provide: APP_PIPE, useClass: CommonZodValidationPipe },
  ],
})
export class GatewayModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(voyagerMiddleware({ endpointUrl: '/graphql' }))
      .forRoutes({ path: '/voyager', method: RequestMethod.GET })
      .apply(AuthRpcMiddleware)
      .forRoutes({ path: '/**', method: RequestMethod.ALL });
  }
}
