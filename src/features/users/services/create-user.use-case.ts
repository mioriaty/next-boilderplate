import { ValidationError } from '@/models/errors/app-error';
import { CreateUserData, User } from '@/models/user';
import { AuthService } from '@/services/auth-service';
import { UserRepository } from '@/services/user-repository';

export interface CreateUserDependencies {
  userRepository: UserRepository;
  authService: AuthService;
}

export interface CreateUserResult {
  user: User;
}

/**
 * Pure function use case for creating a user
 *
 * Usage without DI container:
 * const result = await createUserUseCase({ userRepository, authService }, userData)
 */
export async function createUserUseCase(
  dependencies: CreateUserDependencies,
  data: CreateUserData
): Promise<CreateUserResult> {
  // Validate input
  if (!data.name || data.name.length < 2) {
    throw new ValidationError('Name must be at least 2 characters');
  }

  if (!data.email || !isValidEmail(data.email)) {
    throw new ValidationError('Invalid email address');
  }

  if (!data.password || data.password.length < 8) {
    throw new ValidationError('Password must be at least 8 characters');
  }

  // Check if user already exists
  const existingUser = await dependencies.userRepository.findByEmail(data.email);
  if (existingUser) {
    throw new ValidationError('User with this email already exists');
  }

  // Hash password
  const hashedPassword = await dependencies.authService.hashPassword(data.password);

  // Create user
  const user = await dependencies.userRepository.create({
    ...data,
    password: hashedPassword
  });

  return { user };
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
