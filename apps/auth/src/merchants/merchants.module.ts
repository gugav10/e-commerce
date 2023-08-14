import { Module } from '@nestjs/common';
import { MerchantsLibModule, provideMerchantsDataLoader } from '@app/merchants';
import { MerchantsResolver } from './merchants.resolver';

@Module({
  imports: [MerchantsLibModule],
  providers: [MerchantsResolver, ...provideMerchantsDataLoader()],
  exports: [MerchantsLibModule],
})
export class MerchantsModule {}
