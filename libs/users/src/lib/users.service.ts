import { Inject, Injectable } from '@nestjs/common';
import { USERS_REPOSITORY_TOKEN, UsersRepository } from './repositories';
import { UpdateUserInput } from './dto';
import { NotFoundException } from '@app/common';
import { User } from './entities';
import { UserCreationAttrs, UsernameOrEmail } from './interfaces';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USERS_REPOSITORY_TOKEN) private usersRepository: UsersRepository,
  ) {}

  async create(input: UserCreationAttrs) {
    const user = await this.usersRepository.create(input);
    return this.findById(user.id);
  }

  findAll() {
    return this.usersRepository.findAll();
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  updateById(id: string, updateUserInput: UpdateUserInput) {
    return this.usersRepository.updateById(id, updateUserInput);
  }

  deleteById(id: string): Promise<number> {
    return this.usersRepository.deleteById(id);
  }

  findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findByEmail(email);
  }

  async verifyUser(id: string): Promise<User> {
    const user = await this.findById(id);

    await this.usersRepository.updateById(id, { isVerified: true });
    return this.findById(user.id);
  }

  async updateUserPassword(id: string, password: string): Promise<void> {
    const user = await this.findById(id);
    await this.usersRepository.updateById(user.id, { password });
  }

  getUserByUsernameOrEmail(input: UsernameOrEmail): Promise<User> {
    return this.usersRepository.findByUsernameOrEmail(input);
  }

  findByIds(ids: string[]): Promise<User[]> {
    console.log(ids);
    return this.usersRepository.findByIds(ids);
  }
}
