import { createTodoUseCase } from '@/features/todos/services/create-todo.use-case';
import { deleteTodoUseCase } from '@/features/todos/services/delete-todo.use-case';
import { getTodosUseCase } from '@/features/todos/services/get-todos.use-case';
import { toggleTodoUseCase } from '@/features/todos/services/toggle-todo.use-case';
import { updateTodoUseCase } from '@/features/todos/services/update-todo.use-case';
import { DrizzleTodoRepository } from '@/services/repositories/todo-repository';

// Create repository instance
const todoRepository = new DrizzleTodoRepository();

// Factory functions for todo use cases
export const createTodoUseCaseFactory = () => {
  return (data: any) => createTodoUseCase({ todoRepository }, data);
};

export const getTodosUseCaseFactory = () => {
  return (filters?: any) => getTodosUseCase({ todoRepository }, filters);
};

export const updateTodoUseCaseFactory = () => {
  return (id: string, data: any) => updateTodoUseCase({ todoRepository }, id, data);
};

export const deleteTodoUseCaseFactory = () => {
  return (id: string) => deleteTodoUseCase({ todoRepository }, id);
};

export const toggleTodoUseCaseFactory = () => {
  return (id: string) => toggleTodoUseCase({ todoRepository }, id);
};
