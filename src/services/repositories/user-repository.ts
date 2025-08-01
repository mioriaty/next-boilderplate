import { NewUser, User } from '@/models/user';
import { UserRepository } from '@/services/interfaces/user-repository';
import { db } from '@/shared/database/connection';
import { users } from '@/shared/database/schemas/users';
import { eq } from 'drizzle-orm';

export class DrizzleUserRepository implements UserRepository {
  async create(data: NewUser): Promise<User> {
    const [user] = await db.insert(users).values(data).returning();
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      password: user.password,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };
  }

  async findByEmail(email: string): Promise<User | null> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    if (!user) return null;

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      password: user.password,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };
  }

  async findById(id: string): Promise<User | null> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    if (!user) return null;

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      password: user.password,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };
  }

  async update(id: string, data: Partial<User>): Promise<User> {
    const [user] = await db
      .update(users)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning();

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      password: user.password,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };
  }

  async delete(id: string): Promise<void> {
    await db.delete(users).where(eq(users.id, id));
  }
}
