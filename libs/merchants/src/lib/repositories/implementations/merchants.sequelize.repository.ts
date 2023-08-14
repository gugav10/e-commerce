import { Repository } from 'sequelize-typescript';
import { MerchantsRepository } from '../merchants.repository.interface';
import { Merchant } from '../../models';
import { Op } from 'sequelize';
import { MerchantCreationAttrs } from '../../interfaces';

export class MerchantsSequelizeRepository implements MerchantsRepository {
  constructor(private merchantsRepository: Repository<Merchant>) {}

  findById(userId: string): Promise<Merchant> {
    return this.merchantsRepository.findByPk(userId);
  }

  deleteById(userId: string): Promise<number> {
    return this.merchantsRepository.destroy({
      where: {
        userId,
      },
    });
  }

  findByIds(ids: string[]): Promise<Merchant[]> {
    return this.merchantsRepository.findAll({
      where: {
        userId: {
          [Op.in]: ids,
        },
      },
    });
  }

  updateById(
    userId: string,
    dto: Partial<MerchantCreationAttrs>,
  ): Promise<[affectedCount: number]> {
    return this.merchantsRepository.update(dto, {
      where: {
        userId,
      },
    });
  }

  create(dto: MerchantCreationAttrs): Promise<Merchant> {
    return this.merchantsRepository.create(dto);
  }
}
