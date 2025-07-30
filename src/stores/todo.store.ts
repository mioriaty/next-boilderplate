// src/stores/todo.store.ts
import { CreateTodoData, Todo, TodoFilters, UpdateTodoData } from '@/entities/models/todo';
import {
  createTodoUseCaseFactory,
  deleteTodoUseCaseFactory,
  getTodosUseCaseFactory,
  toggleTodoUseCaseFactory,
  updateTodoUseCaseFactory
} from '@/libs/factories/todo-factory';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface TodoState {
  // State
  todos: Todo[];
  isLoading: boolean;
  error: string | null;
  filters: TodoFilters;

  // Actions
  loadTodos: (filters?: TodoFilters) => Promise<void>;
  createTodo: (data: CreateTodoData) => Promise<void>;
  updateTodo: (id: string, data: UpdateTodoData) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
  toggleTodo: (id: string) => Promise<void>;
  setFilters: (filters: TodoFilters) => void;
  clearError: () => void;
}

export const useTodoStore = create<TodoState>()(
  persist(
    (set, get) => ({
      // Initial state
      todos: [],
      isLoading: false,
      error: null,
      filters: {},

      // Load todos
      loadTodos: async (filters?: TodoFilters) => {
        try {
          set({ isLoading: true, error: null });
          const getTodos = getTodosUseCaseFactory();
          const result = await getTodos(filters || get().filters);
          set({ todos: result.todos, isLoading: false });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Failed to load todos',
            isLoading: false
          });
        }
      },

      // Create todo
      createTodo: async (data: CreateTodoData) => {
        try {
          set({ isLoading: true, error: null });
          const createTodo = createTodoUseCaseFactory();
          const result = await createTodo(data);
          // Add the new todo to the current state instead of reloading
          set((state) => ({
            todos: [result.todo, ...state.todos],
            isLoading: false
          }));
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Failed to create todo',
            isLoading: false
          });
        }
      },

      // Update todo
      updateTodo: async (id: string, data: UpdateTodoData) => {
        try {
          set({ isLoading: true, error: null });
          const updateTodo = updateTodoUseCaseFactory();
          const result = await updateTodo(id, data);
          // Update the todo in the current state
          set((state) => ({
            todos: state.todos.map((todo) => (todo.id === id ? result.todo : todo)),
            isLoading: false
          }));
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Failed to update todo',
            isLoading: false
          });
        }
      },

      // Delete todo
      deleteTodo: async (id: string) => {
        try {
          set({ isLoading: true, error: null });
          const deleteTodo = deleteTodoUseCaseFactory();
          await deleteTodo(id);
          // Remove the todo from the current state
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

      // Toggle todo
      toggleTodo: async (id: string) => {
        try {
          set({ isLoading: true, error: null });
          const toggleTodo = toggleTodoUseCaseFactory();
          const result = await toggleTodo(id);
          // Update the todo in the current state
          set((state) => ({
            todos: state.todos.map((todo) => (todo.id === id ? result.todo : todo)),
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
    }),
    {
      name: 'todo-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ todos: state.todos })
    }
  )
);
