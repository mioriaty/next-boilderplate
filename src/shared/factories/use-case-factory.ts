import { createUserUseCase } from '@/features/users/services/create-user.use-case';
import { signInUserUseCase } from '@/features/users/services/signin-user.use-case';
import { DrizzleAuthService } from '@/services/auth-service';
import { DrizzleUserRepository } from '@/services/repositories/user-repository';

// Create repository instances
const userRepository = new DrizzleUserRepository();
const authService = new DrizzleAuthService();

// Factory functions for user use cases
export const createUserUseCaseFactory = () => {
  return (data: any) => createUserUseCase({ userRepository, authService }, data);
};

export const signInUserUseCaseFactory = () => {
  return (data: any) => signInUserUseCase({ userRepository, authService }, data);
};
