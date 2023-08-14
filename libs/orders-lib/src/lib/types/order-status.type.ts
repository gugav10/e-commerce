import { registerEnumType } from '@nestjs/graphql';
import { OrderStatus } from '../enums';

registerEnumType(OrderStatus, {
  name: 'OrderStatus',
});
