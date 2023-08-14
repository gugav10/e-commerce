import { RegisterInputSchema } from './register-input.schema';

export const LoginInputSchema = RegisterInputSchema.omit({ username: true });
