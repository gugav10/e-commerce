export interface IProduct {
  id: string;
  title: string;
  description: string;
  price: number;
  active: boolean;
  merchantId: string;
  createdAt: Date;
  updatedAt: Date;
}

export type ProductCreationAttrs = Omit<
  IProduct,
  'id' | 'createdAt' | 'updatedAt'
>;
