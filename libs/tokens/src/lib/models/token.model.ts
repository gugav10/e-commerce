import {
  AutoIncrement,
  BelongsTo,
  Column,
  CreatedAt,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { models } from '@app/users';
import { IToken } from '../interfaces';

@Table({ tableName: 'tokens' })
export class Token extends Model<Token> implements IToken {
  @PrimaryKey
  @AutoIncrement
  @Column({
    get() {
      return this.getDataValue('id').toString();
    },
  })
  id: string;

  @Column
  accessToken: string;

  @Column
  refreshToken: string;

  @Column
  deviceId: string;

  @ForeignKey(() => models.User)
  @Column
  userId: string;

  @BelongsTo(() => models.User)
  user: models.User;

  @Column
  expiredAt: Date;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
