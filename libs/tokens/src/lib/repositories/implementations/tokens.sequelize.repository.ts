import { Attributes, Op } from 'sequelize';
import { Token } from '../../models';
import { TokensRepository } from '../tokens.repository.interface';
import { Repository } from 'sequelize-typescript';

export class TokensSequelizeRepository implements TokensRepository {
  constructor(private tokensRepository: Repository<Token>) {}

  findById(id: string): Promise<Token> {
    return this.tokensRepository.findByPk(id);
  }

  findAll(): Promise<Token[]> {
    return this.tokensRepository.findAll();
  }

  findByIds(ids: string[]): Promise<Token[]> {
    return this.tokensRepository.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
    });
  }

  deleteById(id: string): Promise<number> {
    return this.tokensRepository.destroy({
      where: {
        id,
      },
    });
  }

  updateById(
    id: string,
    dto: Attributes<Token>,
  ): Promise<[affectedCount: number]> {
    return this.tokensRepository.update(dto, {
      where: {
        id,
      },
    });
  }

  create(dto: Token): Promise<Token> {
    return this.tokensRepository.create(dto);
  }

  findByDeviceIdAndUserId(deviceId: string, userId: string): Promise<Token> {
    return this.tokensRepository.findOne({
      where: {
        deviceId,
        userId,
      },
    });
  }
}
