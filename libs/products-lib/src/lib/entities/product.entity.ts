import { IProduct } from '../interfaces';

export class Product implements IProduct {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public price: number,
    public merchantId: string,
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
    public active: boolean = true,
  ) {}
}
