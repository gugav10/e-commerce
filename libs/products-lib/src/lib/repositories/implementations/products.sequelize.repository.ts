import { Repository } from 'sequelize-typescript';
import { ProductsRepository } from '../products.repository.interface';
import { Product } from '../../models';
import { Op } from 'sequelize';
import { ProductCreationAttrs } from '../../interfaces';

export class ProductsSequelizeRepository implements ProductsRepository {
  constructor(private productsRepository: Repository<Product>) {}

  findById(id: string): Promise<Product> {
    return this.productsRepository.findByPk(id);
  }

  deleteById(id: string): Promise<number> {
    return this.productsRepository.destroy({
      where: {
        id,
      },
    });
  }

  findByIds(ids: string[]): Promise<Product[]> {
    return this.productsRepository.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
    });
  }

  updateById(
    id: string,
    dto: Partial<ProductCreationAttrs>,
  ): Promise<[affectedCount: number]> {
    return this.productsRepository.update(dto, {
      where: {
        id,
      },
    });
  }

  create(dto: ProductCreationAttrs): Promise<Product> {
    return this.productsRepository.create(dto);
  }

  findAll(): Promise<Product[]> {
    return this.productsRepository.findAll();
  }
}
