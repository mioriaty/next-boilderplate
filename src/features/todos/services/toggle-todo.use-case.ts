import { NotFoundError } from '@/models/errors/app-error';
import { TodoRepository } from '@/services/interfaces/todo-repository';

import { Todo } from '../types';

export interface ToggleTodoDependencies {
  todoRepository: TodoRepository;
}

export interface ToggleTodoResult {
  todo: Todo;
}

export async function toggleTodoUseCase(dependencies: ToggleTodoDependencies, id: string): Promise<ToggleTodoResult> {
  // Check if todo exists
  const existingTodo = await dependencies.todoRepository.findById(id);
  if (!existingTodo) {
    throw new NotFoundError('Todo not found');
  }

  // Toggle todo
  const todo = await dependencies.todoRepository.toggle(id);

  return { todo };
}
