import { Role } from '../enums';
import { IUser } from '../interfaces';

export class User implements IUser {
  constructor(
    public id: string,
    public username: string,
    public password: string,
    public email: string,
    public role: Role,
    public isActive: boolean = false,
    public isVerified: boolean = false,
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
  ) {}
}
