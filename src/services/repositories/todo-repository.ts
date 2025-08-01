import { CreateTodoData, Todo, TodoFilters, UpdateTodoData } from '@/models/todo';
import { TodoRepository } from '@/services/interfaces/todo-repository';
import { db } from '@/shared/database/connection';
import { todos } from '@/shared/database/schemas/todos';
import { serverOnly } from '@/shared/database/server-only';
import { and, desc, eq, like } from 'drizzle-orm';

export class DrizzleTodoRepository implements TodoRepository {
  async create(data: CreateTodoData): Promise<Todo> {
    serverOnly(); // Ensure server-side only

    const [todo] = await db
      .insert(todos)
      .values({
        title: data.title,
        description: data.description,
        userId: data.userId
      })
      .returning();

    return {
      id: todo.id,
      title: todo.title,
      description: todo.description || undefined,
      completed: todo.completed,
      userId: todo.userId || undefined,
      createdAt: todo.createdAt,
      updatedAt: todo.updatedAt
    };
  }

  async findById(id: string): Promise<Todo | null> {
    serverOnly(); // Ensure server-side only

    const [todo] = await db.select().from(todos).where(eq(todos.id, id));
    if (!todo) return null;

    return {
      id: todo.id,
      title: todo.title,
      description: todo.description || undefined,
      completed: todo.completed,
      userId: todo.userId || undefined,
      createdAt: todo.createdAt,
      updatedAt: todo.updatedAt
    };
  }

  async findAll(filters?: TodoFilters): Promise<Todo[]> {
    serverOnly(); // Ensure server-side only

    const conditions = [];

    if (filters?.userId) {
      conditions.push(eq(todos.userId, filters.userId));
    }

    if (filters?.completed !== undefined) {
      conditions.push(eq(todos.completed, filters.completed));
    }

    if (filters?.search) {
      conditions.push(like(todos.title, `%${filters.search}%`));
    }

    let results;
    if (conditions.length > 0) {
      results = await db
        .select()
        .from(todos)
        .where(and(...conditions))
        .orderBy(desc(todos.createdAt));
    } else {
      results = await db.select().from(todos).orderBy(desc(todos.createdAt));
    }

    return results.map((todo) => ({
      id: todo.id,
      title: todo.title,
      description: todo.description || undefined,
      completed: todo.completed,
      userId: todo.userId || undefined,
      createdAt: todo.createdAt,
      updatedAt: todo.updatedAt
    }));
  }

  async update(id: string, data: UpdateTodoData): Promise<Todo> {
    serverOnly(); // Ensure server-side only

    const [todo] = await db
      .update(todos)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(todos.id, id))
      .returning();

    return {
      id: todo.id,
      title: todo.title,
      description: todo.description || undefined,
      completed: todo.completed,
      userId: todo.userId || undefined,
      createdAt: todo.createdAt,
      updatedAt: todo.updatedAt
    };
  }

  async delete(id: string): Promise<void> {
    serverOnly(); // Ensure server-side only

    await db.delete(todos).where(eq(todos.id, id));
  }

  async toggle(id: string): Promise<Todo> {
    serverOnly(); // Ensure server-side only

    // First get the current todo
    const currentTodo = await this.findById(id);
    if (!currentTodo) {
      throw new Error('Todo not found');
    }

    // Update with the opposite completed value
    const [todo] = await db
      .update(todos)
      .set({
        completed: !currentTodo.completed,
        updatedAt: new Date()
      })
      .where(eq(todos.id, id))
      .returning();

    return {
      id: todo.id,
      title: todo.title,
      description: todo.description || undefined,
      completed: todo.completed,
      userId: todo.userId || undefined,
      createdAt: todo.createdAt,
      updatedAt: todo.updatedAt
    };
  }
}
