import { DeliveryStatus } from '../enums';
import { IDelivery } from '../interfaces';

export class Delivery implements IDelivery {
  constructor(
    public id: string,
    public deliverId: string,
    public locationId: string,
    public userId: string,
    public trackingCode: string,
    public status: DeliveryStatus,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}
}
