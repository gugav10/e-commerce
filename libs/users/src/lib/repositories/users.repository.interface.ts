import { Repository } from '@app/common';
import { User } from '../entities';
import { CreateUserInput } from '../dto';
import { UsernameOrEmail } from '../interfaces';

export type UsersRepository = Repository<User> & {
  create(dto: CreateUserInput): Promise<User>;
  findByEmail(email: string): Promise<User>;
  findByUsernameOrEmail(input: UsernameOrEmail): Promise<User>;
};

export const USERS_REPOSITORY_TOKEN = Symbol('users-repository-token');
