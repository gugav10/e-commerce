import { Repository } from '@app/common';
import { Product } from '../entities';
import { ProductCreationAttrs } from '../interfaces';

export interface ProductsRepository extends Repository<Product> {
  create(dto: ProductCreationAttrs): Promise<Product>;
}

export const PRODUCTS_REPOSITORY_TOKEN = Symbol('products-repository-token');
