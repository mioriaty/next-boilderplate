// src/libs/validations/todo-validations.ts
import { z } from 'zod';

export const createTodoSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title must be less than 100 characters'),
  description: z.string().max(500, 'Description must be less than 500 characters').optional()
});

export const updateTodoSchema = z.object({
  title: z.string().min(1, 'Title cannot be empty').max(100, 'Title must be less than 100 characters').optional(),
  description: z.string().max(500, 'Description must be less than 500 characters').optional(),
  completed: z.boolean().optional()
});

export const todoFiltersSchema = z.object({
  completed: z.boolean().optional(),
  search: z.string().optional()
});

export type CreateTodoFormData = z.infer<typeof createTodoSchema>;
export type UpdateTodoFormData = z.infer<typeof updateTodoSchema>;
export type TodoFiltersFormData = z.infer<typeof todoFiltersSchema>;
