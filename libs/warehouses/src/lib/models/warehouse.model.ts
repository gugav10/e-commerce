import {
  AutoIncrement,
  Column,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { IWarehouse } from '../interfaces';

@Table({ tableName: 'warehouses', timestamps: false })
export class Warehouse extends Model<Warehouse> implements IWarehouse {
  @PrimaryKey
  @AutoIncrement
  @Column({
    get() {
      return this.getDataValue('id').toString();
    },
  })
  id: string;

  @Column
  merchantId: string;

  @Column
  locationId: string;
}
