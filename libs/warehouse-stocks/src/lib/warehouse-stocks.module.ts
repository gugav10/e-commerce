import { Module } from '@nestjs/common';
import { WarehouseStocksService } from './warehouse-stocks.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { WarehouseStock } from './models';
import { provideWarehouseStocksRepository } from './repositories/implementations';
import { DataSource } from '@app/common';

@Module({
  imports: [SequelizeModule.forFeature([WarehouseStock])],
  providers: [
    WarehouseStocksService,
    ...provideWarehouseStocksRepository(DataSource.SEQUELIZE),
  ],
  exports: [WarehouseStocksService],
})
export class WarehouseStocksModule {}
