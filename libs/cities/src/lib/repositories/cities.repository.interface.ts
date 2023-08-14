import { Repository } from '@app/common';
import { City } from '../entities';

export type CitiesRepository = Pick<
  Repository<City>,
  'findAll' | 'findById' | 'findByIds'
>;

export const CITIES_REPOSITORY_TOKEN = Symbol('cities-repository-token');
