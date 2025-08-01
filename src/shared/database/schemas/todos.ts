import { boolean, pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

import { users } from './users';

// Todos table
export const todos = pgTable('todos', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: varchar('title', { length: 100 }).notNull(),
  description: text('description'),
  completed: boolean('completed').default(false).notNull(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
});

// Types for TypeScript
export type Todo = typeof todos.$inferSelect;
export type NewTodo = typeof todos.$inferInsert;
