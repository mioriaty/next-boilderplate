import { createUserUseCase } from '@/application/use-cases/user/create-user.use-case';
import { signinUserUseCase } from '@/application/use-cases/user/signin-user.use-case';
import { InMemoryUserRepository } from '@/infrastructure/repositories/user-repository';
import { JwtAuthService } from '@/infrastructure/services/auth-service';

/**
 * Simple Factory Pattern for Use Cases
 * Creates pre-wired use case functions
 */
export function createUserUseCaseFactory() {
  const userRepository = new InMemoryUserRepository();
  const authService = new JwtAuthService();

  return (data: any) => createUserUseCase({ userRepository, authService }, data);
}

export function signinUserUseCaseFactory() {
  const userRepository = new InMemoryUserRepository();
  const authService = new JwtAuthService();

  return (credentials: any) => signinUserUseCase({ userRepository, authService }, credentials);
}

// Usage in components:
// const createUser = createUserUseCaseFactory()
// const result = await createUser(userData)
