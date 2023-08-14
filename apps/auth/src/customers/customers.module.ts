import { Module } from '@nestjs/common';
import { CustomersResolver } from './customers.resolver';
import { CustomersLibModule } from '@app/customers';

@Module({
  imports: [CustomersLibModule],
  providers: [CustomersResolver],
  exports: [CustomersLibModule],
})
export class CustomersModule {}
