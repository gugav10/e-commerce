import { ResolveReference, Resolver } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { MERCHANTS_DATALOADER_TOKEN, types, entities } from '@app/merchants';
import { TypeReferencePayload } from '@app/common';

@Resolver(() => types.Merchant)
export class MerchantsResolver {
  constructor(
    @Inject(MERCHANTS_DATALOADER_TOKEN)
    private readonly merchantsLoader: DataLoader<string, entities.Merchant>,
  ) {}

  @ResolveReference()
  resolveReference(
    reference: TypeReferencePayload<types.MerchantReference>,
  ): Promise<types.Merchant> {
    return this.merchantsLoader.load(reference.userId);
  }
}
