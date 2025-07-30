import { TodoRepository } from '@/application/interfaces/todo-repository';
import { CreateTodoData, Todo, TodoFilters, UpdateTodoData } from '@/entities/models/todo';
import { v4 } from 'uuid';

export class InMemoryTodoRepository implements TodoRepository {
  private todos: Todo[] = [
    {
      id: v4(),
      title: 'Learn Clean Architecture',
      description: 'Study the principles and patterns of Clean Architecture',
      completed: false,
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01')
    },
    {
      id: v4(),
      title: 'Implement Zustand Store',
      description: 'Create global state management with Zustand',
      completed: true,
      createdAt: new Date('2024-01-02'),
      updatedAt: new Date('2024-01-02')
    }
  ];

  async create(data: CreateTodoData): Promise<Todo> {
    const todo: Todo = {
      id: v4(),
      title: data.title,
      description: data.description,
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.todos.push(todo);
    return todo;
  }

  async findById(id: string): Promise<Todo | null> {
    return this.todos.find((todo) => todo.id === id) || null;
  }

  async findAll(filters?: TodoFilters): Promise<Todo[]> {
    let filteredTodos = [...this.todos];

    // Filter by completion status
    if (filters?.completed !== undefined) {
      filteredTodos = filteredTodos.filter((todo) => todo.completed === filters.completed);
    }

    // Filter by search term
    if (filters?.search) {
      const searchTerm = filters.search.toLowerCase();
      filteredTodos = filteredTodos.filter(
        (todo) => todo.title.toLowerCase().includes(searchTerm) || todo.description?.toLowerCase().includes(searchTerm)
      );
    }

    // Sort by creation date (newest first)
    return filteredTodos.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async update(id: string, data: UpdateTodoData): Promise<Todo> {
    const todoIndex = this.todos.findIndex((todo) => todo.id === id);
    if (todoIndex === -1) {
      throw new Error('Todo not found');
    }

    const updatedTodo: Todo = {
      ...this.todos[todoIndex],
      ...data,
      updatedAt: new Date()
    };

    this.todos[todoIndex] = updatedTodo;
    return updatedTodo;
  }

  async delete(id: string): Promise<void> {
    const todoIndex = this.todos.findIndex((todo) => todo.id === id);
    if (todoIndex === -1) {
      throw new Error('Todo not found');
    }

    this.todos.splice(todoIndex, 1);
  }

  async toggleComplete(id: string): Promise<Todo> {
    const todoIndex = this.todos.findIndex((todo) => todo.id === id);
    if (todoIndex === -1) {
      throw new Error('Todo not found');
    }

    const updatedTodo: Todo = {
      ...this.todos[todoIndex],
      completed: !this.todos[todoIndex].completed,
      updatedAt: new Date()
    };

    this.todos[todoIndex] = updatedTodo;
    return updatedTodo;
  }
}
