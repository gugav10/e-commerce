import * as DataLoader from 'dataloader';
import { MerchantsService } from '../merchants.service';
import { Provider, Scope } from '@nestjs/common';

export const MERCHANTS_DATALOADER_TOKEN = Symbol('merchants-dataloader-token');

export function createMerchantsDataLoader(merchantsService: MerchantsService) {
  return new DataLoader(async (keys: string[]) => {
    const results = await merchantsService.findByIds(keys);
    console.log(typeof keys[0]);

    return keys.map((key) =>
      results.find((result) => {
        console.log(typeof result.userId);
        return result.userId === key;
      }),
    );
  });
}

export function provideMerchantsDataLoader(): Provider[] {
  return [
    {
      provide: MERCHANTS_DATALOADER_TOKEN,
      useFactory: (merchantsService: MerchantsService) =>
        createMerchantsDataLoader(merchantsService),
      inject: [MerchantsService],
      scope: Scope.REQUEST,
    },
  ];
}
