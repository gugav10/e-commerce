import { createUnionType } from '@nestjs/graphql';
import { types as customerTypes } from '@app/customers';
import { types as merchantTypes } from '@app/merchants';

export const Profile = createUnionType({
  name: 'Profile',
  types: () => [customerTypes.Customer, merchantTypes.Merchant],
  resolveType(value: new (...args: any[]) => any) {
    if (!value) {
      return null;
    }
    const constructorName: string = value?.constructor?.name;
    switch (constructorName) {
      case customerTypes.Customer.name:
        return customerTypes.Customer;
      case merchantTypes.Merchant.name:
        return merchantTypes.Merchant;
      default:
        return null;
    }
  },
});
