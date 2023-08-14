import { Column, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { IMerchant } from '../interfaces';

@Table({ tableName: 'merchants', timestamps: false })
export class Merchant extends Model<Merchant> implements IMerchant {
  @PrimaryKey
  @Column({
    get() {
      return this.getDataValue('userId').toString();
    },
  })
  userId: string;

  @Column
  name: string;
}
