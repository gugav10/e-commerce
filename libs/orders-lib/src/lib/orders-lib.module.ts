import { Module } from '@nestjs/common';
import { OrdersLibService } from './orders-lib.service';
import { provideOrdersRepository } from './repositories';
import { DataSource } from '@app/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Order } from './models';

@Module({
  imports: [SequelizeModule.forFeature([Order])],
  providers: [
    OrdersLibService,
    ...provideOrdersRepository(DataSource.SEQUELIZE),
  ],
  exports: [OrdersLibService],
})
export class OrdersLibModule {}
