import {
  AutoIncrement,
  Column,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { ICity } from '../interfaces';

@Table({ tableName: 'cities', timestamps: false })
export class City extends Model<City> implements ICity {
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
}
