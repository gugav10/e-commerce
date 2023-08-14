import { IWarehouseStock } from '../interfaces';

export class WarehouseStock implements IWarehouseStock {
  constructor(
    public id: string,
    public productId: string,
    public warehouseId: string,
    public quantity: number,
  ) {}
}
