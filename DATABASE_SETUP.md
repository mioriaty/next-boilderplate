# Database Setup with Drizzle ORM, PostgreSQL & Supabase

## Prerequisites

1. **Supabase Account**: Create a project at [supabase.com](https://supabase.com)
2. **PostgreSQL Database**: Use Supabase's hosted PostgreSQL
3. **Next.js Project**: Set up with hybrid architecture

## Environment Variables

Create a `.env.local` file in the root directory:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"

# Database Configuration
DATABASE_URL="postgresql://postgres:password@db.your-project.supabase.co:5432/postgres"
```

## Project Structure

```
src/
├── app/
│   └── api/                    # API routes for database operations
│       ├── todos/
│       │   ├── route.ts        # GET /api/todos, POST /api/todos
│       │   └── [id]/
│       │       └── route.ts    # GET, PUT, DELETE, PATCH /api/todos/[id]
│       └── users/
│           ├── route.ts        # User API endpoints
│           └── [id]/
│               └── route.ts    # Individual user operations
├── shared/
│   └── database/               # Database configuration
│       ├── schemas/            # Domain-specific schemas
│       │   ├── index.ts        # Re-exports all schemas
│       │   ├── users.ts        # User domain schema
│       │   └── todos.ts        # Todo domain schema
│       ├── connection.ts       # Database connection (server-only)
│       ├── supabase-client.ts  # Supabase client configuration
│       └── server-only.ts      # Server-side utilities
└── services/
    ├── repositories/           # Repository implementations
    │   ├── todo-repository.ts
    │   └── user-repository.ts
    └── interfaces/             # Service contracts
        ├── todo-repository.ts
        └── user-repository.ts
```

## Database Schema

The project includes the following tables:

### Users Table

- `id` (UUID, Primary Key)
- `email` (VARCHAR, Unique)
- `name` (VARCHAR)
- `password` (VARCHAR)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

### Todos Table

- `id` (UUID, Primary Key)
- `title` (VARCHAR)
- `description` (TEXT)
- `completed` (BOOLEAN)
- `user_id` (UUID, Foreign Key to users.id)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

## Database Commands

### Generate Migration

```bash
pnpm db:generate
```

### Push Schema to Database

```bash
pnpm db:push
```

### Run Migrations

```bash
pnpm db:migrate
```

### Open Drizzle Studio

```bash
pnpm db:studio
```

## Supabase Setup

1. **Create a new project** in Supabase dashboard
2. **Get your connection string** from Settings > Database
3. **Get your API keys** from Settings > API
4. **Update your `.env.local`** with the correct values
5. **Create database tables** using SQL Editor

## API Routes Pattern

### Database Operations via API Routes

```typescript
// src/app/api/todos/route.ts
import { createServerClient } from '@/shared/database/supabase-client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const supabase = createServerClient();
    const { data: todos, error } = await supabase.from('todos').select('*').order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ error: 'Failed to fetch todos' }, { status: 500 });
    }

    return NextResponse.json(todos);
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = createServerClient();
    const body = await request.json();

    const { data: todo, error } = await supabase.from('todos').insert(body).select().single();

    if (error) {
      return NextResponse.json({ error: 'Failed to create todo' }, { status: 500 });
    }

    return NextResponse.json(todo, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
```

## Repository Pattern

The project uses Clean Architecture with repository pattern:

- **Entities**: `src/models/` - Business models
- **Interfaces**: `src/services/interfaces/` - Repository contracts
- **Implementations**: `src/services/repositories/` - Drizzle implementations

## Usage Example

```typescript
// Using the repository
import { DrizzleTodoRepository } from '@/services/repositories/todo-repository';

const todoRepo = new DrizzleTodoRepository();
const todo = await todoRepo.create({
  title: 'Learn Supabase',
  description: 'Study the documentation',
  userId: 'user-id'
});
```

## Authentication with Supabase

The project includes Supabase client for authentication:

```typescript
import { supabase } from '@/shared/database/supabase-client'

// Sign up
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'password'
})

// Sign in
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password'
})
```

## Server-Side Safety

All database operations are protected with server-only utilities:

```typescript
// src/shared/database/server-only.ts
export function serverOnly() {
  if (typeof window !== 'undefined') {
    throw new Error('This function can only be called on the server side');
  }
}

// Usage in repositories
export class DrizzleTodoRepository implements TodoRepository {
  async create(data: CreateTodoData): Promise<Todo> {
    serverOnly(); // Ensure server-side only
    // ... implementation
  }
}
```

## Data Persistence

**Important**: All data is saved directly to the Supabase database. The app no longer uses local storage for
persistence.

### Benefits:

- ✅ **Data persists across devices**
- ✅ **Real-time synchronization**
- ✅ **Backup and recovery**
- ✅ **Multi-user support**
- ✅ **No local storage dependencies**

## Troubleshooting

### Common Issues

1. **"Missing Supabase environment variables"**
   - Ensure `.env.local` file exists with correct values
   - Restart the development server after adding environment variables

2. **"Row-level security policy violation"**
   - Run the RLS policy fix script in Supabase SQL Editor
   - Ensure policies allow the operations you need

3. **"Failed to fetch todos"**
   - Check if Supabase project is active
   - Verify database tables are created
   - Check browser console for detailed error messages

4. **"Module not found" errors**
   - Ensure all dependencies are installed: `pnpm install`
   - Check that `@supabase/supabase-js` is in package.json

### Environment Variables Checklist

```bash
# Required for client-side Supabase
NEXT_PUBLIC_SUPABASE_URL=✓
NEXT_PUBLIC_SUPABASE_ANON_KEY=✓

# Required for server-side database operations
DATABASE_URL=✓
```
