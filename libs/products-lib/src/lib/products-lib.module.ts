import { Module } from '@nestjs/common';
import { ProductsLibService } from './products-lib.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from './models';
import { provideProductsRepository } from './repositories';
import { DataSource } from '@app/common';

@Module({
  imports: [SequelizeModule.forFeature([Product])],
  providers: [
    ProductsLibService,
    ...provideProductsRepository(DataSource.SEQUELIZE),
  ],
  exports: [ProductsLibService],
})
export class ProductsLibModule {}
