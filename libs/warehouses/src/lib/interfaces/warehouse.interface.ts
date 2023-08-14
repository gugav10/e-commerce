export interface IWarehouse {
  id: string;
  merchantId: string;
  locationId: string;
}

export type WarehouseCreationAttrs = Omit<IWarehouse, 'id'>;
