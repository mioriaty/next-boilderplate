import { TodoRepository } from '@/application/interfaces/todo-repository';
import { ValidationError } from '@/entities/errors/app-error';
import { CreateTodoData, Todo } from '@/entities/models/todo';

export interface CreateTodoDependencies {
  todoRepository: TodoRepository;
}

export interface CreateTodoResult {
  todo: Todo;
}

export async function createTodoUseCase(
  dependencies: CreateTodoDependencies,
  data: CreateTodoData
): Promise<CreateTodoResult> {
  // Validate input
  if (!data.title || data.title.trim().length === 0) {
    throw new ValidationError('Todo title is required');
  }

  if (data.title.length > 100) {
    throw new ValidationError('Todo title must be less than 100 characters');
  }

  if (data.description && data.description.length > 500) {
    throw new ValidationError('Todo description must be less than 500 characters');
  }

  // Create todo
  const todo = await dependencies.todoRepository.create({
    title: data.title.trim(),
    description: data.description?.trim()
  });

  return { todo };
}
