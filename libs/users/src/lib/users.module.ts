import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models';
import { provideUsersRepository } from './repositories/implementations/users.repository.provider';
import { DataSource } from '@app/common';

@Module({
  imports: [SequelizeModule.forFeature([User])],
  providers: [UsersService, ...provideUsersRepository(DataSource.SEQUELIZE)],
  exports: [UsersService],
})
export class UsersLibModule {}
