// src/services/service-factory.ts
import { TodoRepository } from './interfaces/todo-repository';
import { UserRepository } from './interfaces/user-repository';
import { TodoRepositoryImpl } from './repositories/todo-repository';
import { UserRepositoryImpl } from './repositories/user-repository';

export interface ServiceDependencies {
  todoRepository: TodoRepository;
  userRepository: UserRepository;
}

export function getServices(): ServiceDependencies {
  return {
    todoRepository: new TodoRepositoryImpl(),
    userRepository: new UserRepositoryImpl()
  };
}
