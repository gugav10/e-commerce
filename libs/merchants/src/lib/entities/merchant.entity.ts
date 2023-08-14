import { IMerchant } from '../interfaces';

export class Merchant implements IMerchant {
  constructor(public userId: string, public name: string) {}
}
