import { Repository } from '@app/common';
import { Token } from '../entities';
import { TokenCreationAttributes } from '../interfaces';

export type TokensRepository = Repository<Token> & {
  create(input: TokenCreationAttributes): Promise<Token>;
  findByDeviceIdAndUserId(deviceId: string, userId: string): Promise<Token>;
};

export const TOKENS_REPOSITORY_TOKEN = Symbol('tokens-repository-token');
