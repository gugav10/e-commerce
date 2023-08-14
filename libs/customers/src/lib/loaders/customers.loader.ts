import * as DataLoader from 'dataloader';
import { CustomersService } from '../customers.service';
import { Provider, Scope } from '@nestjs/common';

export const CUSTOMERS_DATALOADER_TOKEN = Symbol('customers-dataloader-token');

export function createCustomersDataLoader(customersService: CustomersService) {
  return new DataLoader(async (keys: string[]) => {
    const results = await customersService.findByIds(keys);

    return keys.map((key) => results.find((result) => result.userId === key));
  });
}

export function provideCustomersDataLoader(): Provider[] {
  return [
    {
      provide: CUSTOMERS_DATALOADER_TOKEN,
      useFactory: (customersService: CustomersService) =>
        createCustomersDataLoader(customersService),
      inject: [CustomersService],
      scope: Scope.REQUEST,
    },
  ];
}
