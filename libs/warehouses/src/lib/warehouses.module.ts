import { Module } from '@nestjs/common';
import { WarehousesService } from './warehouses.service';

@Module({
  providers: [WarehousesService],
  exports: [WarehousesService],
})
export class WarehousesModule {}
