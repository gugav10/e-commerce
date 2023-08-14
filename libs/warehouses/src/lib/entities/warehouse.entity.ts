import { IWarehouse } from '../interfaces';

export class Warehouse implements IWarehouse {
  constructor(
    public id: string,
    public merchantId: string,
    public locationId: string,
  ) {}
}
