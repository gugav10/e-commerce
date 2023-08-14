import { Repository } from '@app/common';
import { Merchant } from '../entities';

export type MerchantsRepository = Repository<Merchant>;

export const MERCHANTS_REPOSITORY_TOKEN = Symbol('merchants-repository-token');
