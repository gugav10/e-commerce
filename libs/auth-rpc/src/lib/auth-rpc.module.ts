import { Module } from '@nestjs/common';
import { AuthRpcService } from './auth-rpc.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Service } from '@app/common';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: Service.AUTH,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.NATS,
          options: {
            name: configService.get<string>('SERVICE_NAME'),
            servers: [configService.get<string>('MESSAGE_QUEUE_URL')],
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  providers: [AuthRpcService],
  exports: [AuthRpcService],
})
export class AuthRpcModule {}
