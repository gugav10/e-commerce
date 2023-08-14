import { ICustomer } from '../interfaces';

export class Customer implements ICustomer {
  constructor(
    public userId: string,
    public firstName: string,
    public lastName: string,
  ) {}
}
