import { z } from 'nestjs-zod/z';

export const RegisterInputSchema = z.object({
  username: z
    .string()
    .min(4, 'Minimum username length is 4 characters')
    .max(30, 'Maximum username length is 30 characters'),
  email: z
    .string()
    .max(100, 'Maximum email length is 100 characters')
    .email('Invalid email format'),
  password: z
    .password()
    .min(8, 'Minimum password length is 8 characters')
    .max(100, 'Maximum password length is 100 characters')
    .atLeastOne('digit')
    .atLeastOne('special')
    .atLeastOne('uppercase'),
  deviceId: z.string().min(10).max(100),
});
