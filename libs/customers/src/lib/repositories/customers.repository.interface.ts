import { Repository } from '@app/common';
import { Customer } from '../entities';

export type CustomersRepository = Repository<Customer>;

export const CUSTOMERS_REPOSITORY_TOKEN = Symbol('customers-repository-token');
