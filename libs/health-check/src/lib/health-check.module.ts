import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { DynamicModule } from '@nestjs/common/interfaces';
import { TerminusModule } from '@nestjs/terminus';

@Module({})
export class HealthCheckModule {
  static register(controller: any): DynamicModule {
    return {
      imports: [TerminusModule, HttpModule],
      module: HealthCheckModule,
      controllers: [controller],
    };
  }
}
