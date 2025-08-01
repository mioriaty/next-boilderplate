import { UnauthorizedError, ValidationError } from '@/models/errors/app-error';
import { AuthService } from '@/services/interfaces/auth-service';
import { UserRepository } from '@/services/interfaces/user-repository';

import { SignInData, User } from '../types';
import { signInSchema } from '../validations';

export interface SignInUserDependencies {
  userRepository: UserRepository;
  authService: AuthService;
}

export interface SignInUserResult {
  user: User;
}

export async function signInUserUseCase(
  dependencies: SignInUserDependencies,
  data: SignInData
): Promise<SignInUserResult> {
  // Validate input
  const validatedData = signInSchema.parse(data);

  // Find user by email
  const user = await dependencies.userRepository.findByEmail(validatedData.email);
  if (!user) {
    throw new UnauthorizedError('Invalid email or password');
  }

  // Verify password
  const isValidPassword = await dependencies.authService.verifyPassword(validatedData.password, user.password);
  if (!isValidPassword) {
    throw new UnauthorizedError('Invalid email or password');
  }

  return { user };
}
