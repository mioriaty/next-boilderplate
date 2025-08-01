# Database Setup with Drizzle ORM, PostgreSQL & Supabase

## Prerequisites

1. **Supabase Account**: Create a project at [supabase.com](https://supabase.com)
2. **PostgreSQL Database**: Either use Supabase's hosted PostgreSQL or your own instance

## Environment Variables

Create a `.env.local` file in the root directory:

```env
# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/your_database"

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
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

## Repository Pattern

The project uses Clean Architecture with repository pattern:

- **Entities**: `src/entities/models/` - Business models
- **Interfaces**: `src/application/interfaces/` - Repository contracts
- **Implementations**: `src/infrastructure/repositories/` - Drizzle implementations

## Usage Example

```typescript
// Using the repository
import { DrizzleUserRepository } from '@/infrastructure/repositories/user-repository';

const userRepo = new DrizzleUserRepository();
const user = await userRepo.create({
  email: 'user@example.com',
  name: 'John Doe',
  password: 'hashed-password'
});
```

## Authentication with Supabase

The project includes Supabase client for authentication:

```typescript
import { supabase } from '@/libs/database/supabase'

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
