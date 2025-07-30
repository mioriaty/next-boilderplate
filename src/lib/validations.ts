// src/lib/validations.ts
import { z } from 'zod'

/**
 * User form validation schema
 */
export const userSchema = z.object({
	name: z.string().min(2, 'Name must be at least 2 characters'),
	email: z.string().email('Invalid email address'),
	password: z.string().min(8, 'Password must be at least 8 characters'),
})

export type UserFormData = z.infer<typeof userSchema>

/**
 * Login form validation schema
 */
export const loginSchema = z.object({
	email: z.string().email('Invalid email address'),
	password: z.string().min(1, 'Password is required'),
})

export type LoginFormData = z.infer<typeof loginSchema>
