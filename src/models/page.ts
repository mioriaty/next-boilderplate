export interface Page {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreatePageData {
  title: string;
  description?: string;
}

export interface UpdatePageData {
  title?: string;
  description?: string;
  completed?: boolean;
}

export interface PageFilters {
  completed?: boolean;
  search?: string;
}
