import { Module } from '@nestjs/common';
import { MerchantsController } from './merchants.controller';
import { MerchantsService } from './merchants.service';

@Module({
  imports: [],
  controllers: [MerchantsController],
  providers: [MerchantsService],
})
export class MerchantsModule {}
