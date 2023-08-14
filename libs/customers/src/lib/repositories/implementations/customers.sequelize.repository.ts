import { Repository } from 'sequelize-typescript';
import { CustomersRepository } from '../customers.repository.interface';
import { Customer } from '../../models';
import { CustomerCreationAttrs } from '../../interfaces';
import { Op } from 'sequelize';

export class CustomersSequelizeRepository implements CustomersRepository {
  constructor(private customersRepository: Repository<Customer>) {}

  findAll(): Promise<Customer[]> {
    return this.customersRepository.findAll();
  }

  findByIds(ids: string[]): Promise<Customer[]> {
    return this.customersRepository.findAll({
      where: {
        userId: {
          [Op.in]: ids,
        },
      },
    });
  }

  deleteById(userId: string): Promise<number> {
    return this.customersRepository.destroy({
      where: {
        userId,
      },
    });
  }

  updateById(
    userId: string,
    dto: Partial<CustomerCreationAttrs>,
  ): Promise<[affectedCount: number]> {
    return this.customersRepository.update(dto, {
      where: {
        userId,
      },
    });
  }

  create(dto: CustomerCreationAttrs): Promise<Customer> {
    return this.customersRepository.create(dto);
  }

  findById(userId: string): Promise<Customer> {
    return this.customersRepository.findByPk(userId);
  }
}
