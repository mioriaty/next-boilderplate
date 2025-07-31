import { createTodoUseCase } from '@/features/todo/services/create-todo.use-case';
import { ValidationError } from '@/models/errors/app-error';
import { CreateTodoData, Todo } from '@/models/todo';
import { TodoRepository } from '@/services/todo-repository';

// Mock repository
const mockTodoRepository: jest.Mocked<TodoRepository> = {
  create: jest.fn(),
  findById: jest.fn(),
  findAll: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  toggleComplete: jest.fn()
};

describe('createTodoUseCase', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create a todo successfully', async () => {
    const mockTodo: Todo = {
      id: '1',
      title: 'Test Todo',
      description: 'Test Description',
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    mockTodoRepository.create.mockResolvedValue(mockTodo);

    const data: CreateTodoData = {
      title: 'Test Todo',
      description: 'Test Description'
    };

    const result = await createTodoUseCase({ todoRepository: mockTodoRepository }, data);

    expect(mockTodoRepository.create).toHaveBeenCalledWith({
      title: 'Test Todo',
      description: 'Test Description'
    });
    expect(result.todo).toEqual(mockTodo);
  });

  it('should create a todo without description', async () => {
    const mockTodo: Todo = {
      id: '1',
      title: 'Test Todo',
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    mockTodoRepository.create.mockResolvedValue(mockTodo);

    const data: CreateTodoData = {
      title: 'Test Todo'
    };

    const result = await createTodoUseCase({ todoRepository: mockTodoRepository }, data);

    expect(mockTodoRepository.create).toHaveBeenCalledWith({
      title: 'Test Todo',
      description: undefined
    });
    expect(result.todo).toEqual(mockTodo);
  });

  it('should throw ValidationError when title is empty', async () => {
    const data: CreateTodoData = {
      title: ''
    };

    await expect(createTodoUseCase({ todoRepository: mockTodoRepository }, data)).rejects.toThrow(ValidationError);
    await expect(createTodoUseCase({ todoRepository: mockTodoRepository }, data)).rejects.toThrow(
      'Todo title is required'
    );
  });

  it('should throw ValidationError when title is only whitespace', async () => {
    const data: CreateTodoData = {
      title: '   '
    };

    await expect(createTodoUseCase({ todoRepository: mockTodoRepository }, data)).rejects.toThrow(ValidationError);
    await expect(createTodoUseCase({ todoRepository: mockTodoRepository }, data)).rejects.toThrow(
      'Todo title is required'
    );
  });

  it('should throw ValidationError when title is too long', async () => {
    const data: CreateTodoData = {
      title: 'a'.repeat(101)
    };

    await expect(createTodoUseCase({ todoRepository: mockTodoRepository }, data)).rejects.toThrow(ValidationError);
    await expect(createTodoUseCase({ todoRepository: mockTodoRepository }, data)).rejects.toThrow(
      'Todo title must be less than 100 characters'
    );
  });

  it('should throw ValidationError when description is too long', async () => {
    const data: CreateTodoData = {
      title: 'Test Todo',
      description: 'a'.repeat(501)
    };

    await expect(createTodoUseCase({ todoRepository: mockTodoRepository }, data)).rejects.toThrow(ValidationError);
    await expect(createTodoUseCase({ todoRepository: mockTodoRepository }, data)).rejects.toThrow(
      'Todo description must be less than 500 characters'
    );
  });

  it('should trim title and description', async () => {
    const mockTodo: Todo = {
      id: '1',
      title: 'Test Todo',
      description: 'Test Description',
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    mockTodoRepository.create.mockResolvedValue(mockTodo);

    const data: CreateTodoData = {
      title: '  Test Todo  ',
      description: '  Test Description  '
    };

    await createTodoUseCase({ todoRepository: mockTodoRepository }, data);

    expect(mockTodoRepository.create).toHaveBeenCalledWith({
      title: 'Test Todo',
      description: 'Test Description'
    });
  });
});
