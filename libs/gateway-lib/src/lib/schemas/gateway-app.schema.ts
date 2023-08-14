import { BaseAppSchema } from '@app/common';
import { z } from 'nestjs-zod/z';

export const GatewayAppSchema = BaseAppSchema.pick({
  MESSAGE_QUEUE_URL: true,
  PORT: true,
  SERVICE_NAME: true,
}).extend({
  AUTH_SUBGRAPH_URL: z.string().url(),
  PRODUCTS_SUBGRAPH_URL: z.string().url(),
});
