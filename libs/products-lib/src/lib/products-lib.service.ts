import { Inject, Injectable } from '@nestjs/common';
import { PRODUCTS_REPOSITORY_TOKEN, ProductsRepository } from './repositories';
import { Product } from './entities';
import { NotFoundException } from '@app/common';
import { CreateProductInput } from './inputs';

@Injectable()
export class ProductsLibService {
  constructor(
    @Inject(PRODUCTS_REPOSITORY_TOKEN)
    private productsRepository: ProductsRepository,
  ) {}

  async findById(id: string): Promise<Product | null> {
    const product = await this.productsRepository.findById(id);

    if (!product) {
      throw new NotFoundException();
    }

    return product;
  }

  findByIds(ids: string[]): Promise<Product[]> {
    return this.productsRepository.findByIds(ids);
  }

  findAll(): Promise<Product[]> {
    return this.productsRepository.findAll();
  }

  async create(
    input: CreateProductInput,
    merchantId: string,
  ): Promise<Product> {
    const product = await this.productsRepository.create({
      active: true,
      merchantId,
      ...input,
    });

    return this.findById(product.id);
  }
}
