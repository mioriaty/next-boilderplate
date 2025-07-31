import { NotFoundError } from '@/models/errors/app-error';
import { Todo } from '@/models/todo';
import { TodoRepository } from '@/services/todo-repository';

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
