import {
  AutoIncrement,
  Column,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { ILocation } from '../interfaces';

@Table({ tableName: 'locations', timestamps: false })
export class Location extends Model<Location> implements ILocation {
  @PrimaryKey
  @AutoIncrement
  @Column({
    get() {
      return this.getDataValue('id').toString();
    },
  })
  id: string;

  @Column
  cityId: string;
}
