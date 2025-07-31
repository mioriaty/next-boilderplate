// src/services/todo-service.ts
import { createTodoUseCase } from '@/features/todo/services/create-todo.use-case';
import { deleteTodoUseCase } from '@/features/todo/services/delete-todo.use-case';
import { getTodosUseCase } from '@/features/todo/services/get-todos.use-case';
import { toggleTodoUseCase } from '@/features/todo/services/toggle-todo.use-case';
import { updateTodoUseCase } from '@/features/todo/services/update-todo.use-case';
import { CreateTodoData, Todo, TodoFilters, UpdateTodoData } from '@/models/todo';

import { getServices } from './service-factory';

export class TodoService {
  private services = getServices();

  async createTodo(data: CreateTodoData): Promise<Todo> {
    const result = await createTodoUseCase({ todoRepository: this.services.todoRepository }, data);
    return result.todo;
  }

  async getTodos(filters?: TodoFilters): Promise<Todo[]> {
    const result = await getTodosUseCase({ todoRepository: this.services.todoRepository }, filters);
    return result.todos;
  }

  async updateTodo(id: string, data: UpdateTodoData): Promise<Todo> {
    const result = await updateTodoUseCase({ todoRepository: this.services.todoRepository }, id, data);
    return result.todo;
  }

  async deleteTodo(id: string): Promise<void> {
    await deleteTodoUseCase({ todoRepository: this.services.todoRepository }, id);
  }

  async toggleTodo(id: string): Promise<Todo> {
    const result = await toggleTodoUseCase({ todoRepository: this.services.todoRepository }, id);
    return result.todo;
  }
}

// Singleton instance
export const todoService = new TodoService();
