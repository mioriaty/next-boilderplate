import { TodoRepository } from '@/application/interfaces/todo-repository';
import { NotFoundError } from '@/entities/errors/app-error';

export interface DeleteTodoDependencies {
  todoRepository: TodoRepository;
}

export interface DeleteTodoResult {
  success: boolean;
}

export async function deleteTodoUseCase(dependencies: DeleteTodoDependencies, id: string): Promise<DeleteTodoResult> {
  // Check if todo exists
  const existingTodo = await dependencies.todoRepository.findById(id);
  if (!existingTodo) {
    throw new NotFoundError('Todo not found');
  }

  // Delete todo
  await dependencies.todoRepository.delete(id);

  return { success: true };
}
