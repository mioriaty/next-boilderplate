import { z } from 'zod';

export const createTodoSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title must be less than 100 characters'),
  description: z.string().max(500, 'Description must be less than 500 characters').optional(),
  userId: z.string().optional()
});

export const updateTodoSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title must be less than 100 characters').optional(),
  description: z.string().max(500, 'Description must be less than 500 characters').optional(),
  completed: z.boolean().optional()
});

export const todoFiltersSchema = z.object({
  userId: z.string().optional(),
  completed: z.boolean().optional(),
  search: z.string().optional()
});

export type CreateTodoInput = z.infer<typeof createTodoSchema>;
export type UpdateTodoInput = z.infer<typeof updateTodoSchema>;
export type TodoFiltersInput = z.infer<typeof todoFiltersSchema>;
