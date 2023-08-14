import { Module } from '@nestjs/common';
import { StocksLibService } from './stocks-lib.service';
import { WarehouseStocksModule } from '@app/warehouse-stocks';

@Module({
  imports: [WarehouseStocksModule],
  providers: [StocksLibService],
  exports: [StocksLibService],
})
export class StocksLibModule {}
