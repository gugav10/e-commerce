import { registerEnumType } from '@nestjs/graphql';
import { Role } from '../enums';

registerEnumType(Role, {
  name: 'Role',
});
