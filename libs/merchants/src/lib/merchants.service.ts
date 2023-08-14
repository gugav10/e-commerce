import { Inject, Injectable } from '@nestjs/common';
import {
  MERCHANTS_REPOSITORY_TOKEN,
  MerchantsRepository,
} from './repositories';
import { Merchant } from './entities';
import { NotFoundException } from '@app/common';

@Injectable()
export class MerchantsService {
  constructor(
    @Inject(MERCHANTS_REPOSITORY_TOKEN)
    private merchantsRepository: MerchantsRepository,
  ) {}

  async findById(id: string): Promise<Merchant | null> {
    const customer = await this.merchantsRepository.findById(id);

    if (!customer) {
      throw new NotFoundException();
    }

    return customer;
  }

  findByIds(ids: string[]): Promise<Merchant[]> {
    return this.merchantsRepository.findByIds(ids);
  }
}
