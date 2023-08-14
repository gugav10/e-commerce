import { IToken } from '../interfaces';

export class Token implements IToken {
  constructor(
    public id: string,
    public accessToken: string,
    public refreshToken: string,
    public deviceId: string,
    public userId: string,
    public expiredAt: Date,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}
}
