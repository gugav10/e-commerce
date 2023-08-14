import { Inject, Injectable } from '@nestjs/common';
import {
  CUSTOMERS_REPOSITORY_TOKEN,
  CustomersRepository,
} from './repositories';
import { Customer } from './entities';
import { NotFoundException } from '@app/common';

@Injectable()
export class CustomersService {
  constructor(
    @Inject(CUSTOMERS_REPOSITORY_TOKEN)
    private customersRepository: CustomersRepository,
  ) {}

  async findById(id: string): Promise<Customer | null> {
    const customer = await this.customersRepository.findById(id);

    if (!customer) {
      throw new NotFoundException();
    }

    return customer;
  }

  findByIds(ids: string[]): Promise<Customer[]> {
    return this.customersRepository.findByIds(ids);
  }
}
