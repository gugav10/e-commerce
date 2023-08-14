import {
  AutoIncrement,
  Column,
  CreatedAt,
  DataType,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { IDelivery } from '../interfaces';
import { DeliveryStatus } from '../enums';

@Table({ tableName: 'delivery' })
export class Delivery extends Model<Delivery> implements IDelivery {
  @PrimaryKey
  @AutoIncrement
  @Column({
    get() {
      return this.getDataValue('id').toString();
    },
  })
  id: string;

  @Column({
    get() {
      return this.getDataValue('deliverId').toString();
    },
  })
  deliverId: string;

  @Column
  locationId: string;

  @Column
  userId: string;

  @Column({ type: DataType.ENUM(...Object.values(DeliveryStatus)) })
  status: DeliveryStatus;

  @Column
  trackingCode: string;

  @CreatedAt
  @Column
  createdAt: Date;

  @UpdatedAt
  @Column
  updatedAt: Date;
}
