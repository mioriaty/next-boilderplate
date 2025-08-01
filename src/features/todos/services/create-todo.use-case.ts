import { ValidationError } from '@/models/errors/app-error';
import { TodoRepository } from '@/services/interfaces/todo-repository';

import { CreateTodoData, Todo } from '../types';
import { createTodoSchema } from '../validations';

export interface CreateTodoDependencies {
  todoRepository: TodoRepository;
}

export interface CreateTodoResult {
  todo: Todo;
}

export async function createTodoUseCase(
  dependencies: CreateTodoDependencies,
  data: CreateTodoData
): Promise<CreateTodoResult> {
  // Validate input
  const validatedData = createTodoSchema.parse(data);

  // Create todo
  const todo = await dependencies.todoRepository.create(validatedData);

  return { todo };
}
