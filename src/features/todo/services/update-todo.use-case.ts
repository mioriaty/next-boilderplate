import { NotFoundError, ValidationError } from '@/models/errors/app-error';
import { Todo, UpdateTodoData } from '@/models/todo';
import { TodoRepository } from '@/services/todo-repository';

export interface UpdateTodoDependencies {
  todoRepository: TodoRepository;
}

export interface UpdateTodoResult {
  todo: Todo;
}

export async function updateTodoUseCase(
  dependencies: UpdateTodoDependencies,
  id: string,
  data: UpdateTodoData
): Promise<UpdateTodoResult> {
  // Validate input
  if (data.title !== undefined && data.title.trim().length === 0) {
    throw new ValidationError('Todo title cannot be empty');
  }

  if (data.title && data.title.length > 100) {
    throw new ValidationError('Todo title must be less than 100 characters');
  }

  if (data.description && data.description.length > 500) {
    throw new ValidationError('Todo description must be less than 500 characters');
  }

  // Check if todo exists
  const existingTodo = await dependencies.todoRepository.findById(id);
  if (!existingTodo) {
    throw new NotFoundError('Todo not found');
  }

  // Update todo
  const todo = await dependencies.todoRepository.update(id, {
    title: data.title?.trim(),
    description: data.description?.trim(),
    completed: data.completed
  });

  return { todo };
}
