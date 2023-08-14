import {
  AutoIncrement,
  Column,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { IWarehouseStock } from '../interfaces';

@Table({ tableName: 'warehouse_stocks', timestamps: false })
export class WarehouseStock
  extends Model<WarehouseStock>
  implements IWarehouseStock
{
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
      return this.getDataValue('productId').toString();
    },
  })
  productId: string;

  @Column
  warehouseId: string;

  @Column
  quantity: number;
}
