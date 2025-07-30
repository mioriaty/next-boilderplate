// src/application/use-cases/toggle-todo.use-case.ts
import { TodoRepository } from '@/application/interfaces/todo-repository';
import { NotFoundError } from '@/entities/errors/app-error';
import { Todo } from '@/entities/models/todo';

export interface ToggleTodoDependencies {
  todoRepository: TodoRepository;
}

export interface ToggleTodoResult {
  todo: Todo;
}

export async function toggleTodoUseCase(dependencies: ToggleTodoDependencies, id: string): Promise<ToggleTodoResult> {
  // Check if todo exists
  const existingTodo = await dependencies.todoRepository.findById(id);
  if (!existingTodo) {
    throw new NotFoundError('Todo not found');
  }

  // Toggle todo completion
  const todo = await dependencies.todoRepository.toggleComplete(id);

  return { todo };
}
