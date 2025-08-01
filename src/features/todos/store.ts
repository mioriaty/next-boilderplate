import { create } from 'zustand';

import { CreateTodoData, Todo, TodoFilters, TodoStore, UpdateTodoData } from './types';

export const useTodoStore = create<TodoStore>((set, get) => ({
  // Initial state
  todos: [],
  isLoading: false,
  error: null,
  filters: {},

  // Load todos from API
  loadTodos: async (filters?: TodoFilters) => {
    try {
      set({ isLoading: true, error: null });

      const params = new URLSearchParams();
      if (filters?.userId) params.append('userId', filters.userId);
      if (filters?.completed !== undefined) params.append('completed', filters.completed.toString());
      if (filters?.search) params.append('search', filters.search);

      const response = await fetch(`/api/todos?${params.toString()}`);

      if (!response.ok) {
        throw new Error('Failed to load todos');
      }

      const todos = await response.json();
      set({ todos, isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to load todos',
        isLoading: false
      });
    }
  },

  // Create todo via API
  createTodo: async (data: CreateTodoData) => {
    try {
      set({ isLoading: true, error: null });

      const response = await fetch('/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create todo');
      }

      const newTodo = await response.json();
      set((state) => ({
        todos: [newTodo, ...state.todos],
        isLoading: false
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to create todo',
        isLoading: false
      });
    }
  },

  // Update todo via API
  updateTodo: async (id: string, data: UpdateTodoData) => {
    try {
      set({ isLoading: true, error: null });

      const response = await fetch(`/api/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update todo');
      }

      const updatedTodo = await response.json();
      set((state) => ({
        todos: state.todos.map((todo) => (todo.id === id ? updatedTodo : todo)),
        isLoading: false
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to update todo',
        isLoading: false
      });
    }
  },

  // Delete todo via API
  deleteTodo: async (id: string) => {
    try {
      set({ isLoading: true, error: null });

      const response = await fetch(`/api/todos/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete todo');
      }

      set((state) => ({
        todos: state.todos.filter((todo) => todo.id !== id),
        isLoading: false
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to delete todo',
        isLoading: false
      });
    }
  },

  // Toggle todo via API
  toggleTodo: async (id: string) => {
    try {
      set({ isLoading: true, error: null });

      const response = await fetch(`/api/todos/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to toggle todo');
      }

      const toggledTodo = await response.json();
      set((state) => ({
        todos: state.todos.map((todo) => (todo.id === id ? toggledTodo : todo)),
        isLoading: false
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to toggle todo',
        isLoading: false
      });
    }
  },

  // Set filters
  setFilters: (filters: TodoFilters) => {
    set({ filters });
  },

  // Clear error
  clearError: () => {
    set({ error: null });
  }
}));
