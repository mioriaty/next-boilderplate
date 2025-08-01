export interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  userId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateTodoData {
  title: string;
  description?: string;
  userId?: string;
}

export interface UpdateTodoData {
  title?: string;
  description?: string;
  completed?: boolean;
}

export interface TodoFilters {
  userId?: string;
  completed?: boolean;
  search?: string;
}

export interface TodoStore {
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
