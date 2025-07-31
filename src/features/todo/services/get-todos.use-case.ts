import { Todo, TodoFilters } from '@/models/todo';
import { TodoRepository } from '@/services/todo-repository';

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
