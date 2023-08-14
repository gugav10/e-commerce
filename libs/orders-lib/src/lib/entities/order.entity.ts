import { OrderStatus } from '../enums';
import { IOrder } from '../interfaces';

export class Order implements IOrder {
  constructor(
    public id: string,
    public deliveryId: string,
    public productId: string,
    public status: OrderStatus,
    public locationId: string,
    public userId: string,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}
}
