import { ValidationError } from '@/models/errors/app-error';
import { AuthService } from '@/services/interfaces/auth-service';
import { UserRepository } from '@/services/interfaces/user-repository';

import { CreateUserData, User } from '../types';
import { createUserSchema } from '../validations';

export interface CreateUserDependencies {
  userRepository: UserRepository;
  authService: AuthService;
}

export interface CreateUserResult {
  user: User;
}

export async function createUserUseCase(
  dependencies: CreateUserDependencies,
  data: CreateUserData
): Promise<CreateUserResult> {
  // Validate input
  const validatedData = createUserSchema.parse(data);

  // Check if user already exists
  const existingUser = await dependencies.userRepository.findByEmail(validatedData.email);
  if (existingUser) {
    throw new ValidationError('User with this email already exists');
  }

  // Hash password
  const hashedPassword = await dependencies.authService.hashPassword(validatedData.password);

  // Create user
  const user = await dependencies.userRepository.create({
    ...validatedData,
    password: hashedPassword
  });

  return { user };
}
