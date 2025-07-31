import { TodoFilters } from '@/features/todo/types';
import { Todo } from '@/models/todo';
import { create } from 'zustand';

interface TodoState {
  todos: Todo[];
  filteredTodos: Todo[];
  filters: TodoFilters;
  isLoading: boolean;
  error: string | null;
}

interface TodoActions {
  setTodos: (todos: Todo[]) => void;
  addTodo: (todo: Todo) => void;
  updateTodo: (id: string, updates: Partial<Todo>) => void;
  deleteTodo: (id: string) => void;
  toggleTodo: (id: string) => void;
  setFilters: (filters: TodoFilters) => void;
  clearFilters: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

type TodoStore = TodoState & TodoActions;

export const useTodoStore = create<TodoStore>((set, get) => ({
  todos: [],
  filteredTodos: [],
  filters: {},
  isLoading: false,
  error: null,

  setTodos: (todos) => {
    const { filters } = get();
    const filteredTodos = filterTodos(todos, filters);
    set({ todos, filteredTodos });
  },

  addTodo: (todo) =>
    set((state) => {
      const newTodos = [...state.todos, todo];
      const filteredTodos = filterTodos(newTodos, state.filters);
      return { todos: newTodos, filteredTodos };
    }),

  updateTodo: (id, updates) =>
    set((state) => {
      const newTodos = state.todos.map((todo) => (todo.id === id ? { ...todo, ...updates } : todo));
      const filteredTodos = filterTodos(newTodos, state.filters);
      return { todos: newTodos, filteredTodos };
    }),

  deleteTodo: (id) =>
    set((state) => {
      const newTodos = state.todos.filter((todo) => todo.id !== id);
      const filteredTodos = filterTodos(newTodos, state.filters);
      return { todos: newTodos, filteredTodos };
    }),

  toggleTodo: (id) =>
    set((state) => {
      const newTodos = state.todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo));
      const filteredTodos = filterTodos(newTodos, state.filters);
      return { todos: newTodos, filteredTodos };
    }),

  setFilters: (filters) =>
    set((state) => {
      const filteredTodos = filterTodos(state.todos, filters);
      return { filters, filteredTodos };
    }),

  clearFilters: () =>
    set((state) => {
      const filters = {};
      const filteredTodos = filterTodos(state.todos, filters);
      return { filters, filteredTodos };
    }),

  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  clearError: () => set({ error: null })
}));

// Helper function to filter todos
function filterTodos(todos: Todo[], filters: TodoFilters): Todo[] {
  return todos.filter((todo) => {
    // Filter by completion status
    if (filters.completed !== undefined && todo.completed !== filters.completed) {
      return false;
    }

    // Filter by search term
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      const titleMatch = todo.title.toLowerCase().includes(searchLower);
      const descriptionMatch = todo.description?.toLowerCase().includes(searchLower) || false;
      if (!titleMatch && !descriptionMatch) {
        return false;
      }
    }

    return true;
  });
}
