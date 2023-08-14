import { z } from 'nestjs-zod/z';

export const BaseAppSchema = z.object({
  DB_SCHEMA: z.string().nonempty(),
  DB_DIALECT: z.string().nonempty(),
  DB_PORT: z.string().nonempty(),
  DB_DATABASE: z.string().nonempty(),
  DB_USERNAME: z.string().nonempty(),
  DB_PASSWORD: z.string().nonempty(),
  MESSAGE_QUEUE_URL: z.string().url(),
  PORT: z.string(),
  SERVICE_NAME: z.string().nonempty(),
});
