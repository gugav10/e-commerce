import { Repository } from 'sequelize-typescript';
import { DeliveryRepository } from '../delivery.repository.interface';
import { Delivery } from '../../models';
import { DeliveryCreationAttrs } from '../../interfaces';

export class DeliverySequelizeRepository implements DeliveryRepository {
  constructor(private deliveryRepository: Repository<Delivery>) {}

  deleteById(id: string): Promise<number> {
    return this.deliveryRepository.destroy({
      where: {
        id,
      },
    });
  }

  updateById(
    id: string,
    dto: Partial<DeliveryCreationAttrs>,
  ): Promise<[affectedCount: number]> {
    return this.deliveryRepository.update(dto, {
      where: {
        id,
      },
    });
  }

  create(dto: DeliveryCreationAttrs): Promise<Delivery> {
    return this.deliveryRepository.create(dto);
  }

  findById(id: string): Promise<Delivery> {
    return this.deliveryRepository.findByPk(id);
  }
}
