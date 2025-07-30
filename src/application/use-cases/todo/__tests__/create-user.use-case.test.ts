// src/application/use-cases/__tests__/create-user.use-case.test.ts
import { CreateUserDependencies, createUserUseCase } from '@/application/use-cases/user/create-user.use-case';
import { ValidationError } from '@/entities/errors/app-error';
import { CreateUserData } from '@/entities/models/user';

describe('createUserUseCase', () => {
  let mockDependencies: CreateUserDependencies;
  let mockUserRepository: any;
  let mockAuthService: any;

  beforeEach(() => {
    mockUserRepository = {
      findByEmail: jest.fn(),
      create: jest.fn()
    };

    mockAuthService = {
      hashPassword: jest.fn()
    };

    mockDependencies = {
      userRepository: mockUserRepository,
      authService: mockAuthService
    };
  });

  it('should create a user successfully', async () => {
    const userData: CreateUserData = {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123'
    };

    const mockUser = {
      id: '123',
      name: 'John Doe',
      email: 'john@example.com',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    mockUserRepository.findByEmail.mockResolvedValue(null);
    mockAuthService.hashPassword.mockResolvedValue('hashed_password');
    mockUserRepository.create.mockResolvedValue(mockUser);

    const result = await createUserUseCase(mockDependencies, userData);

    expect(result.user).toEqual(mockUser);
    expect(mockUserRepository.findByEmail).toHaveBeenCalledWith('john@example.com');
    expect(mockAuthService.hashPassword).toHaveBeenCalledWith('password123');
    expect(mockUserRepository.create).toHaveBeenCalledWith({
      ...userData,
      password: 'hashed_password'
    });
  });

  it('should throw ValidationError for invalid name', async () => {
    const userData: CreateUserData = {
      name: 'J',
      email: 'john@example.com',
      password: 'password123'
    };

    await expect(createUserUseCase(mockDependencies, userData)).rejects.toThrow(ValidationError);
    await expect(createUserUseCase(mockDependencies, userData)).rejects.toThrow('Name must be at least 2 characters');
  });

  it('should throw ValidationError for invalid email', async () => {
    const userData: CreateUserData = {
      name: 'John Doe',
      email: 'invalid-email',
      password: 'password123'
    };

    await expect(createUserUseCase(mockDependencies, userData)).rejects.toThrow(ValidationError);
    await expect(createUserUseCase(mockDependencies, userData)).rejects.toThrow('Invalid email address');
  });

  it('should throw ValidationError for short password', async () => {
    const userData: CreateUserData = {
      name: 'John Doe',
      email: 'john@example.com',
      password: '123'
    };

    await expect(createUserUseCase(mockDependencies, userData)).rejects.toThrow(ValidationError);
    await expect(createUserUseCase(mockDependencies, userData)).rejects.toThrow(
      'Password must be at least 8 characters'
    );
  });

  it('should throw ValidationError if user already exists', async () => {
    const userData: CreateUserData = {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123'
    };

    const existingUser = {
      id: '123',
      name: 'John Doe',
      email: 'john@example.com',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    mockUserRepository.findByEmail.mockResolvedValue(existingUser);

    await expect(createUserUseCase(mockDependencies, userData)).rejects.toThrow(ValidationError);
    await expect(createUserUseCase(mockDependencies, userData)).rejects.toThrow('User with this email already exists');
  });
});
