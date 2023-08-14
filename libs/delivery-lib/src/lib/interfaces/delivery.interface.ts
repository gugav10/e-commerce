import { DeliveryStatus } from '../enums';

export interface IDelivery {
  id: string;
  deliverId: string;
  locationId: string;
  userId: string;
  status: DeliveryStatus;
  trackingCode: string;
  createdAt: Date;
  updatedAt: Date;
}

export type DeliveryCreationAttrs = Omit<IDelivery, 'createdAt' | 'updatedAt'>;
