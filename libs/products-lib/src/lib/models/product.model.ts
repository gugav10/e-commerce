import {
  AutoIncrement,
  Column,
  CreatedAt,
  Model,
  PrimaryKey,
  UpdatedAt,
  Table,
} from 'sequelize-typescript';
import { IProduct } from '../interfaces';

@Table({ tableName: 'products' })
export class Product extends Model<Product> implements IProduct {
  @PrimaryKey
  @AutoIncrement
  @Column({
    get() {
      return this.getDataValue('id').toString();
    },
  })
  id: string;

  @Column
  title: string;

  @Column
  description: string;

  @Column
  merchantId: string;

  @Column
  price: number;

  @Column
  active: boolean;

  @CreatedAt
  @Column
  createdAt: Date;

  @UpdatedAt
  @Column
  updatedAt: Date;
}
