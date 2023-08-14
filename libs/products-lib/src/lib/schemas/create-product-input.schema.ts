import { z } from 'nestjs-zod/z';

export const CreateProductInputSchema = z.object({
  title: z.string().min(4).max(25),
  description: z.string().min(4).max(200),
  price: z.number().positive(),
});
