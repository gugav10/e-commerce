import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Customer } from './models';
import { provideCustomersRepository } from './repositories';
import { DataSource } from '@app/common';

@Module({
  imports: [SequelizeModule.forFeature([Customer])],
  providers: [
    CustomersService,
    ...provideCustomersRepository(DataSource.SEQUELIZE),
  ],
  exports: [CustomersService],
})
export class CustomersLibModule {}
