// src/application/use-cases/get-todos.use-case.ts
import { TodoRepository } from '@/application/interfaces/todo-repository';
import { Todo, TodoFilters } from '@/entities/models/todo';

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
  const todos = await dependencies.todoRepository.findAll(filters);
  return { todos };
}
