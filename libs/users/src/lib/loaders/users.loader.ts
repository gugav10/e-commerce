import * as DataLoader from 'dataloader';
import { UsersService } from '../users.service';
import { Provider, Scope } from '@nestjs/common';

export const USERS_DATALOADER_TOKEN = Symbol('user-dataloader-token');

export function createUsersDataLoader(usersService: UsersService) {
  return new DataLoader(async (keys: string[]) => {
    const results = await usersService.findByIds(keys);

    return keys.map((key) => results.find((result) => result.id === key));
  });
}

export function provideUsersDataLoader(): Provider[] {
  return [
    {
      provide: USERS_DATALOADER_TOKEN,
      useFactory: (usersService: UsersService) =>
        createUsersDataLoader(usersService),
      inject: [UsersService],
      scope: Scope.REQUEST,
    },
  ];
}
