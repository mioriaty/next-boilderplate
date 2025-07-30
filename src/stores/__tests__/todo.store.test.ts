import { CreateTodoData, Todo, UpdateTodoData } from '@/entities/models/todo';
import { useTodoStore } from '@/stores/todo.store';
import { act, renderHook } from '@testing-library/react';

// Mock the todo factory
jest.mock('@/libs/factories/todo-factory', () => ({
  createTodoUseCaseFactory: jest.fn(() => jest.fn()),
  getTodosUseCaseFactory: jest.fn(() => jest.fn()),
  updateTodoUseCaseFactory: jest.fn(() => jest.fn()),
  deleteTodoUseCaseFactory: jest.fn(() => jest.fn()),
  toggleTodoUseCaseFactory: jest.fn(() => jest.fn())
}));

describe('useTodoStore', () => {
  beforeEach(() => {
    // Clear the store state before each test
    const { result } = renderHook(() => useTodoStore());
    act(() => {
      result.current.clearError();
    });
  });

  it('should have initial state', () => {
    const { result } = renderHook(() => useTodoStore());

    expect(result.current.todos).toEqual([]);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.filters).toEqual({});
  });

  it('should load todos successfully', async () => {
    const mockTodos: Todo[] = [
      {
        id: '1',
        title: 'Test Todo',
        description: 'Test Description',
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    const { result } = renderHook(() => useTodoStore());

    // Mock the getTodos factory to return mock data
    const mockGetTodos = jest.fn().mockResolvedValue({ todos: mockTodos });
    jest.requireMock('@/libs/factories/todo-factory').getTodosUseCaseFactory.mockReturnValue(mockGetTodos);

    await act(async () => {
      await result.current.loadTodos();
    });

    expect(result.current.todos).toEqual(mockTodos);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should handle load todos error', async () => {
    const { result } = renderHook(() => useTodoStore());

    // Mock the getTodos factory to throw an error
    const mockGetTodos = jest.fn().mockRejectedValue(new Error('Failed to load'));
    jest.requireMock('@/libs/factories/todo-factory').getTodosUseCaseFactory.mockReturnValue(mockGetTodos);

    await act(async () => {
      await result.current.loadTodos();
    });

    expect(result.current.todos).toEqual([]);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe('Failed to load');
  });

  it('should create todo successfully', async () => {
    const { result } = renderHook(() => useTodoStore());

    // Mock the createTodo factory
    const mockCreateTodo = jest.fn().mockResolvedValue(undefined);
    jest.requireMock('@/libs/factories/todo-factory').createTodoUseCaseFactory.mockReturnValue(mockCreateTodo);

    // Mock the getTodos factory to return updated data
    const mockGetTodos = jest.fn().mockResolvedValue({ todos: [] });
    jest.requireMock('@/libs/factories/todo-factory').getTodosUseCaseFactory.mockReturnValue(mockGetTodos);

    const todoData: CreateTodoData = {
      title: 'New Todo',
      description: 'New Description'
    };

    await act(async () => {
      await result.current.createTodo(todoData);
    });

    expect(mockCreateTodo).toHaveBeenCalledWith(todoData);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should update todo successfully', async () => {
    const { result } = renderHook(() => useTodoStore());

    // Mock the updateTodo factory
    const mockUpdateTodo = jest.fn().mockResolvedValue(undefined);
    jest.requireMock('@/libs/factories/todo-factory').updateTodoUseCaseFactory.mockReturnValue(mockUpdateTodo);

    // Mock the getTodos factory
    const mockGetTodos = jest.fn().mockResolvedValue({ todos: [] });
    jest.requireMock('@/libs/factories/todo-factory').getTodosUseCaseFactory.mockReturnValue(mockGetTodos);

    const updateData: UpdateTodoData = {
      title: 'Updated Todo'
    };

    await act(async () => {
      await result.current.updateTodo('1', updateData);
    });

    expect(mockUpdateTodo).toHaveBeenCalledWith('1', updateData);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should delete todo successfully', async () => {
    const { result } = renderHook(() => useTodoStore());

    // Mock the deleteTodo factory
    const mockDeleteTodo = jest.fn().mockResolvedValue(undefined);
    jest.requireMock('@/libs/factories/todo-factory').deleteTodoUseCaseFactory.mockReturnValue(mockDeleteTodo);

    // Mock the getTodos factory
    const mockGetTodos = jest.fn().mockResolvedValue({ todos: [] });
    jest.requireMock('@/libs/factories/todo-factory').getTodosUseCaseFactory.mockReturnValue(mockGetTodos);

    await act(async () => {
      await result.current.deleteTodo('1');
    });

    expect(mockDeleteTodo).toHaveBeenCalledWith('1');
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should toggle todo successfully', async () => {
    const { result } = renderHook(() => useTodoStore());

    // Mock the toggleTodo factory
    const mockToggleTodo = jest.fn().mockResolvedValue(undefined);
    jest.requireMock('@/libs/factories/todo-factory').toggleTodoUseCaseFactory.mockReturnValue(mockToggleTodo);

    // Mock the getTodos factory
    const mockGetTodos = jest.fn().mockResolvedValue({ todos: [] });
    jest.requireMock('@/libs/factories/todo-factory').getTodosUseCaseFactory.mockReturnValue(mockGetTodos);

    await act(async () => {
      await result.current.toggleTodo('1');
    });

    expect(mockToggleTodo).toHaveBeenCalledWith('1');
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should set filters', () => {
    const { result } = renderHook(() => useTodoStore());

    const filters = { completed: true, search: 'test' };

    act(() => {
      result.current.setFilters(filters);
    });

    expect(result.current.filters).toEqual(filters);
  });

  it('should clear error', () => {
    const { result } = renderHook(() => useTodoStore());

    // Set an error first
    act(() => {
      result.current.clearError();
    });

    expect(result.current.error).toBeNull();
  });
});
