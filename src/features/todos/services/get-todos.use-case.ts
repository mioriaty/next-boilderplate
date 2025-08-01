import { TodoRepository } from '@/services/interfaces/todo-repository';

import { Todo, TodoFilters } from '../types';

export interface GetTodosDependencies {
  todoRepository: TodoRepository;
}

export interface GetTodosResult {
  todos: Todo[];
}

export async function getTodosUseCase(
  dependencies: GetTodosDependencies,
  filters?: TodoFilters
): Promise<GetTodosResult> {
  // Get todos
  const todos = await dependencies.todoRepository.findAll(filters);

  return { todos };
}
