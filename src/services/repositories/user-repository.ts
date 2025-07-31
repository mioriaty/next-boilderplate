// src/services/repositories/user-repository.ts
import { AppError } from '@/models/errors/app-error';
import { CreateUserData, User } from '@/models/user';

import { UserRepository } from '../interfaces/user-repository';

export class UserRepositoryImpl implements UserRepository {
  private users: User[] = [];
  private nextId = 1;

  async create(data: CreateUserData): Promise<User> {
    try {
      // Check if user with email already exists
      const existingUser = await this.findByEmail(data.email);
      if (existingUser) {
        throw new AppError('User with this email already exists', 409);
      }

      const user: User = {
        id: this.generateId(),
        name: data.name,
        email: data.email,
        password: data.password, // Note: In real app, this should be hashed
        createdAt: new Date(),
        updatedAt: new Date()
      };

      this.users.push(user);
      return user;
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError('Failed to create user', 500);
    }
  }

  async findById(id: string): Promise<User | null> {
    try {
      return this.users.find((user) => user.id === id) || null;
    } catch (error) {
      throw new AppError('Failed to find user', 500);
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    try {
      return this.users.find((user) => user.email === email) || null;
    } catch (error) {
      throw new AppError('Failed to find user by email', 500);
    }
  }

  async update(id: string, data: Partial<User>): Promise<User> {
    try {
      const userIndex = this.users.findIndex((user) => user.id === id);

      if (userIndex === -1) {
        throw new AppError('User not found', 404);
      }

      const updatedUser = {
        ...this.users[userIndex],
        ...data,
        updatedAt: new Date()
      };

      this.users[userIndex] = updatedUser;
      return updatedUser;
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError('Failed to update user', 500);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const userIndex = this.users.findIndex((user) => user.id === id);

      if (userIndex === -1) {
        throw new AppError('User not found', 404);
      }

      this.users.splice(userIndex, 1);
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError('Failed to delete user', 500);
    }
  }

  private generateId(): string {
    return `user_${this.nextId++}_${Date.now()}`;
  }
}
