import { Module } from '@nestjs/common';
import { UsersResolver } from './users.resolver';
import { UsersLibModule, provideUsersDataLoader } from 'libs/users/src';
import { CustomersLibModule, provideCustomersDataLoader } from '@app/customers';
import { MerchantsLibModule, provideMerchantsDataLoader } from '@app/merchants';

@Module({
  imports: [UsersLibModule, CustomersLibModule, MerchantsLibModule],
  providers: [
    UsersResolver,
    ...provideCustomersDataLoader(),
    ...provideMerchantsDataLoader(),
    ...provideUsersDataLoader(),
  ],
  exports: [UsersLibModule],
})
export class UsersModule {}
