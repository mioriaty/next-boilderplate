// src/services/repositories/todo-repository.ts
import { AppError } from '@/models/errors/app-error';
import { CreateTodoData, Todo, TodoFilters, UpdateTodoData } from '@/models/todo';

import { TodoRepository } from '../interfaces/todo-repository';

export class TodoRepositoryImpl implements TodoRepository {
  private todos: Todo[] = [];
  private nextId = 1;

  async create(data: CreateTodoData): Promise<Todo> {
    try {
      const todo: Todo = {
        id: this.generateId(),
        title: data.title,
        description: data.description,
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      this.todos.push(todo);
      return todo;
    } catch (error) {
      throw new AppError('Failed to create todo', 500);
    }
  }

  async findById(id: string): Promise<Todo | null> {
    try {
      return this.todos.find((todo) => todo.id === id) || null;
    } catch (error) {
      throw new AppError('Failed to find todo', 500);
    }
  }

  async findAll(filters?: TodoFilters): Promise<Todo[]> {
    try {
      let filteredTodos = [...this.todos];

      if (filters?.completed !== undefined) {
        filteredTodos = filteredTodos.filter((todo) => todo.completed === filters.completed);
      }

      if (filters?.search) {
        const searchTerm = filters.search.toLowerCase();
        filteredTodos = filteredTodos.filter(
          (todo) =>
            todo.title.toLowerCase().includes(searchTerm) || todo.description?.toLowerCase().includes(searchTerm)
        );
      }

      return filteredTodos.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    } catch (error) {
      throw new AppError('Failed to find todos', 500);
    }
  }

  async update(id: string, data: UpdateTodoData): Promise<Todo> {
    try {
      const todoIndex = this.todos.findIndex((todo) => todo.id === id);

      if (todoIndex === -1) {
        throw new AppError('Todo not found', 404);
      }

      const updatedTodo = {
        ...this.todos[todoIndex],
        ...data,
        updatedAt: new Date()
      };

      this.todos[todoIndex] = updatedTodo;
      return updatedTodo;
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError('Failed to update todo', 500);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const todoIndex = this.todos.findIndex((todo) => todo.id === id);

      if (todoIndex === -1) {
        throw new AppError('Todo not found', 404);
      }

      this.todos.splice(todoIndex, 1);
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError('Failed to delete todo', 500);
    }
  }

  async toggleComplete(id: string): Promise<Todo> {
    try {
      const todo = await this.findById(id);

      if (!todo) {
        throw new AppError('Todo not found', 404);
      }

      return await this.update(id, { completed: !todo.completed });
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError('Failed to toggle todo completion', 500);
    }
  }

  private generateId(): string {
    return `todo_${this.nextId++}_${Date.now()}`;
  }
}
