import { SetMetadata } from '@nestjs/common';
import { Role } from '@app/users';

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);
