import { z } from 'zod';

export const createUserSchema = z.object({
  email: z.string().email('Invalid email address'),
  name: z.string().min(1, 'Name is required').max(100, 'Name must be less than 100 characters'),
  password: z.string().min(6, 'Password must be at least 6 characters')
});

export const signInSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required')
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type SignInInput = z.infer<typeof signInSchema>;
