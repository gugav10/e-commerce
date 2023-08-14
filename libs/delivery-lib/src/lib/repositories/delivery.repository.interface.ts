import { Repository } from '@app/common';
import { Delivery } from '../entities';

export type DeliveryRepository = Repository<Delivery>;

export const DELIVERY_REPOSITORY_TOKEN = Symbol('delivery-repository-token');
