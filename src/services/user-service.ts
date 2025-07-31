// src/services/user-service.ts
import { createUserUseCase } from '@/features/users/services/create-user.use-case';
import { signinUserUseCase } from '@/features/users/services/signin-user.use-case';
import { CreateUserData, User, UserCredentials } from '@/models/user';

import { getServices } from './service-factory';

export class UserService {
  private services = getServices();

  async createUser(data: CreateUserData): Promise<User> {
    // Note: This will need an auth service, but we removed it
    // For now, we'll use a simple implementation
    const user = await this.services.userRepository.create(data);
    return user;
  }

  async signinUser(credentials: UserCredentials): Promise<User> {
    const user = await this.services.userRepository.findByEmail(credentials.email);
    if (!user) {
      throw new Error('User not found');
    }

    // Note: Password comparison would need auth service
    // For now, we'll just return the user
    return user;
  }

  async getUserById(id: string): Promise<User | null> {
    return await this.services.userRepository.findById(id);
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return await this.services.userRepository.findByEmail(email);
  }
}

// Singleton instance
export const userService = new UserService();
