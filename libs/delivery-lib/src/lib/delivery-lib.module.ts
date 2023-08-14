import { Module } from '@nestjs/common';
import { DeliveryLibService } from './delivery-lib.service';

@Module({
  providers: [DeliveryLibService],
  exports: [DeliveryLibService],
})
export class DeliveryLibModule {}
