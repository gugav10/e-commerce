import { Role } from '../enums';

export interface IUser {
  id: string;
  username: string;
  email: string;
  role: Role;
  password: string;
  isActive: boolean;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type UserCreationAttrs = Omit<IUser, 'id' | 'createdAt' | 'updatedAt'>;
