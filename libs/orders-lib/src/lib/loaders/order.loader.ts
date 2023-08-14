import * as DataLoader from 'dataloader';
import { Provider, Scope } from '@nestjs/common';
import { OrdersLibService } from '../orders-lib.service';

export const USER_ORDERS_DATALOADER_TOKEN = Symbol(
  'user-orders-dataloader-token',
);

export function createUserOrdersDataLoader(ordersService: OrdersLibService) {
  return new DataLoader(async (keys: string[]) => {
    const results = await ordersService.findByUserIds(keys);

    return keys.map((key) => results.filter((result) => result.id === key));
  });
}

export function provideUserOrdersDataLoader(): Provider[] {
  return [
    {
      provide: USER_ORDERS_DATALOADER_TOKEN,
      useFactory: (ordersService: OrdersLibService) =>
        createUserOrdersDataLoader(ordersService),
      inject: [OrdersLibService],
      scope: Scope.REQUEST,
    },
  ];
}
