import { Column, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { ICustomer } from '../interfaces';

@Table({ tableName: 'customers', timestamps: false })
export class Customer extends Model<Customer> implements ICustomer {
  @PrimaryKey
  @Column({
    get() {
      return this.getDataValue('userId').toString();
    },
  })
  userId: string;

  @Column
  firstName: string;

  @Column
  lastName: string;
}
