import {
  AutoIncrement,
  Column,
  CreatedAt,
  Model,
  PrimaryKey,
  Unique,
  UpdatedAt,
  Table,
  DataType,
} from 'sequelize-typescript';
import { IUser } from '../interfaces';
import { Role } from '../enums';

@Table({ tableName: 'users' })
export class User extends Model<User> implements IUser {
  @PrimaryKey
  @AutoIncrement
  @Column({
    get() {
      return this.getDataValue('id').toString();
    },
  })
  id: string;

  @Unique
  @Column
  username: string;

  @Unique
  @Column
  email: string;

  @Column({ type: DataType.ENUM(Role.CUSTOMER, Role.MERCHANT, Role.DELIVER) })
  role: Role;

  @Column
  isActive: boolean;

  @Column
  isVerified: boolean;

  @Column
  password: string;

  @CreatedAt
  @Column
  createdAt: Date;

  @UpdatedAt
  @Column
  updatedAt: Date;
}
