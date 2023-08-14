import { Module } from '@nestjs/common';
import { MerchantsService } from './merchants.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Merchant } from './models';
import { provideMerchantsRepository } from './repositories';
import { DataSource } from '@app/common';

@Module({
  imports: [SequelizeModule.forFeature([Merchant])],
  providers: [
    MerchantsService,
    ...provideMerchantsRepository(DataSource.SEQUELIZE),
  ],
  exports: [MerchantsService],
})
export class MerchantsLibModule {}
