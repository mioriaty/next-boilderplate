import { createTodoUseCase } from '@/application/use-cases/todo/create-todo.use-case';
import { deleteTodoUseCase } from '@/application/use-cases/todo/delete-todo.use-case';
import { getTodosUseCase } from '@/application/use-cases/todo/get-todos.use-case';
import { toggleTodoUseCase } from '@/application/use-cases/todo/toggle-todo.use-case';
import { updateTodoUseCase } from '@/application/use-cases/todo/update-todo.use-case';
import { CreateTodoData, TodoFilters, UpdateTodoData } from '@/entities/models/todo';
import { InMemoryTodoRepository } from '@/infrastructure/repositories/todo-repository';

// Create a singleton repository instance
const todoRepository = new InMemoryTodoRepository();

export function createTodoUseCaseFactory() {
  return (data: CreateTodoData) => createTodoUseCase({ todoRepository }, data);
}

export function getTodosUseCaseFactory() {
  return (filters?: TodoFilters) => getTodosUseCase({ todoRepository }, filters);
}

export function updateTodoUseCaseFactory() {
  return (id: string, data: UpdateTodoData) => updateTodoUseCase({ todoRepository }, id, data);
}

export function deleteTodoUseCaseFactory() {
  return (id: string) => deleteTodoUseCase({ todoRepository }, id);
}

export function toggleTodoUseCaseFactory() {
  return (id: string) => toggleTodoUseCase({ todoRepository }, id);
}
