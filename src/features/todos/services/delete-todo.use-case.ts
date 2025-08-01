import { NotFoundError } from '@/models/errors/app-error';
import { TodoRepository } from '@/services/interfaces/todo-repository';

export interface DeleteTodoDependencies {
  todoRepository: TodoRepository;
}

export async function deleteTodoUseCase(dependencies: DeleteTodoDependencies, id: string): Promise<void> {
  // Check if todo exists
  const existingTodo = await dependencies.todoRepository.findById(id);
  if (!existingTodo) {
    throw new NotFoundError('Todo not found');
  }

  // Delete todo
  await dependencies.todoRepository.delete(id);
}
