import { Repository } from '@app/common';
import { Location } from '../entities';

export type LocationsRepository = Repository<Location>;

export const LOCATIONS_REPOSITORY_TOKEN = Symbol('locations-repository-token');
