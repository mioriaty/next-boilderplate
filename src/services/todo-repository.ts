import { CreateTodoData, Todo, TodoFilters, UpdateTodoData } from '@/models/todo';

export interface TodoRepository {
  create(data: CreateTodoData): Promise<Todo>;
  findById(id: string): Promise<Todo | null>;
  findAll(filters?: TodoFilters): Promise<Todo[]>;
  update(id: string, data: UpdateTodoData): Promise<Todo>;
  delete(id: string): Promise<void>;
  toggleComplete(id: string): Promise<Todo>;
}
