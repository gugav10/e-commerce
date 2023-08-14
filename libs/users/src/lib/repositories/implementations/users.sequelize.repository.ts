import { Op } from 'sequelize';
import { User } from '../../models';
import { UsersRepository } from '../users.repository.interface';
import { CreateUserInput } from '../../dto';
import { Repository } from 'sequelize-typescript';
import { UserCreationAttrs, UsernameOrEmail } from '../../interfaces';

export class UsersSequelizeRepository implements UsersRepository {
  constructor(private usersRepository: Repository<User>) {}

  findById(id: string): Promise<User> {
    return this.usersRepository.findByPk(id);
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.findAll();
  }

  deleteById(id: string): Promise<number> {
    return this.usersRepository.destroy({
      where: {
        id,
      },
    });
  }

  findByIds(ids: string[]): Promise<User[]> {
    return this.usersRepository.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
    });
  }

  updateById(
    id: string,
    dto: Partial<UserCreationAttrs>,
  ): Promise<[affectedCount: number]> {
    return this.usersRepository.update(dto, {
      where: {
        id,
      },
    });
  }

  create(dto: CreateUserInput): Promise<User> {
    return this.usersRepository.create(dto);
  }

  findByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({
      where: {
        email,
      },
    });
  }

  findByUsernameOrEmail(input: UsernameOrEmail): Promise<User> {
    return this.usersRepository.findOne({
      where: {
        [Op.or]: [{ email: input.email }, { username: input.username }],
      },
    });
  }
}
