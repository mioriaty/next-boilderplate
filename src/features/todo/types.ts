export interface CreateTodoRequest {
  title: string;
  description?: string;
}

export interface UpdateTodoRequest {
  id: string;
  title?: string;
  description?: string;
  completed?: boolean;
}

export interface TodoFilters {
  completed?: boolean;
  search?: string;
}
