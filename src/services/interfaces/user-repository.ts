import { NewUser, User } from '@/models/user';

export interface UserRepository {
  create(data: NewUser): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  update(id: string, data: Partial<User>): Promise<User>;
  delete(id: string): Promise<void>;
}
