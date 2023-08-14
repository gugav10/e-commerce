import { OrderStatus } from '../enums';

export interface IOrder {
  id: string;
  deliveryId: string;
  productId: string;
  userId: string;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
}

export type OrderCreationAttrs = Omit<IOrder, 'createdAt' | 'updatedAt' | 'id'>;
