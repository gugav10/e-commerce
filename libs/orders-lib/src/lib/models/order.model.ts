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
import { OrderStatus } from '../enums';
import { IOrder } from '../interfaces';

@Table({ tableName: 'orders' })
export class Order extends Model<Order> implements IOrder {
  @PrimaryKey
  @AutoIncrement
  @Column({
    get() {
      return this.getDataValue('id').toString();
    },
  })
  id: string;

  @Column
  deliveryId: string;

  @Column
  productId: string;

  @Column({ type: DataType.ENUM(...Object.values(OrderStatus)) })
  status: OrderStatus;

  @Column
  locationId: string;

  @Column({
    get() {
      return this.getDataValue('userId').toString();
    },
  })
  userId: string;

  @CreatedAt
  @Column
  createdAt: Date;

  @UpdatedAt
  @Column
  updatedAt: Date;
}
