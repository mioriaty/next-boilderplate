import { NotFoundError } from '@/models/errors/app-error';
import { TodoRepository } from '@/services/interfaces/todo-repository';

import { Todo, UpdateTodoData } from '../types';
import { updateTodoSchema } from '../validations';

export interface UpdateTodoDependencies {
  todoRepository: TodoRepository;
}

export interface UpdateTodoResult {
  todo: Todo;
}

export async function updateTodoUseCase(
  dependencies: UpdateTodoDependencies,
  id: string,
  data: UpdateTodoData
): Promise<UpdateTodoResult> {
  // Validate input
  const validatedData = updateTodoSchema.parse(data);

  // Check if todo exists
  const existingTodo = await dependencies.todoRepository.findById(id);
  if (!existingTodo) {
    throw new NotFoundError('Todo not found');
  }

  // Update todo
  const todo = await dependencies.todoRepository.update(id, validatedData);

  return { todo };
}
