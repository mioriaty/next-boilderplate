# Supabase Setup Guide

## Prerequisites

1. **Supabase Account**: Create an account at [supabase.com](https://supabase.com)
2. **Next.js Project**: This project should be set up with the hybrid architecture

## Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click "New Project"
3. Choose your organization
4. Enter project details:
   - **Name**: `next-core-todos` (or your preferred name)
   - **Database Password**: Choose a strong password
   - **Region**: Select the closest region
5. Click "Create new project"
6. Wait for the project to be created (usually 1-2 minutes)

## Step 2: Get Project Credentials

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (e.g., `https://your-project.supabase.co`)
   - **Anon public key** (starts with `eyJ...`)

## Step 3: Set Environment Variables

Create a `.env.local` file in your project root:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# Database URL (for Drizzle)
DATABASE_URL=postgresql://postgres:your-password@db.your-project.supabase.co:5432/postgres
```

**Important**: Replace the values with your actual Supabase project credentials.

## Step 4: Set Up Database Tables

1. Go to **SQL Editor** in your Supabase dashboard
2. Run the following SQL script:

```sql
-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Create todos table
CREATE TABLE IF NOT EXISTS todos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(100) NOT NULL,
  description TEXT,
  completed BOOLEAN DEFAULT FALSE NOT NULL,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE todos ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for todos table (allow all operations for now)
CREATE POLICY "Allow all operations on todos" ON todos
  FOR ALL USING (true)
  WITH CHECK (true);

-- Create RLS policies for users table (allow all operations for now)
CREATE POLICY "Allow all operations on users" ON users
  FOR ALL USING (true)
  WITH CHECK (true);

-- Insert some sample data for testing
INSERT INTO todos (title, description) VALUES
  ('Learn Supabase', 'Study the Supabase documentation'),
  ('Build Todo App', 'Create a todo application with Next.js'),
  ('Deploy to Production', 'Deploy the application to production')
ON CONFLICT DO NOTHING;
```

## Step 5: Clear Local Storage (Optional)

If you had previous local storage data, visit `http://localhost:3000/clear-storage` to clean up any old data.

## Step 6: Test the Integration

1. **Start the development server**:

   ```bash
   pnpm dev
   ```

2. **Visit the main app**: Go to `http://localhost:3000`

3. **Test the functionality**:
   - Create a new todo (saves to Supabase)
   - Toggle todo completion (updates in Supabase)
   - Delete todos (removes from Supabase)
   - Refresh the page (loads from Supabase)

4. **Visit the test page**: Go to `http://localhost:3000/test-todos` for a dedicated test interface

## Step 7: Verify API Routes

The following API routes handle all database operations:

- `GET /api/todos` - Get all todos (with optional filters)
- `POST /api/todos` - Create a new todo
- `GET /api/todos/[id]` - Get a specific todo
- `PUT /api/todos/[id]` - Update a todo
- `DELETE /api/todos/[id]` - Delete a todo
- `PATCH /api/todos/[id]` - Toggle todo completion

## Data Persistence

**Important**: All todo data is now saved directly to the Supabase database. The app no longer uses local storage for
persistence.

### Benefits:

- ✅ **Data persists across devices**
- ✅ **Real-time synchronization**
- ✅ **Backup and recovery**
- ✅ **Multi-user support**
- ✅ **No local storage dependencies**

## Project Structure

```
src/
├── app/
│   ├── api/                    # API routes for database operations
│   │   ├── todos/
│   │   │   ├── route.ts        # GET /api/todos, POST /api/todos
│   │   │   └── [id]/
│   │   │       └── route.ts    # GET, PUT, DELETE, PATCH /api/todos/[id]
│   │   └── users/
│   │       ├── route.ts        # User API endpoints
│   │       └── [id]/
│   │           └── route.ts    # Individual user operations
│   ├── clear-storage/          # Utility to clear local storage
│   ├── test-todos/             # Test page for Supabase integration
│   └── todos/                  # Sample Supabase integration page
├── features/
│   └── todos/                  # Todo feature
│       ├── components/         # Feature-specific UI components
│       ├── services/           # Business logic (use cases)
│       ├── store.ts            # Feature-specific state management
│       ├── types.ts            # Feature-specific type definitions
│       └── validations.ts      # Feature-specific validation schemas
├── shared/
│   ├── components/             # Reusable UI components
│   ├── database/               # Database configuration
│   │   ├── schemas/            # Domain-specific schemas
│   │   ├── connection.ts       # Database connection (server-only)
│   │   ├── supabase-client.ts  # Supabase client configuration
│   │   └── server-only.ts      # Server-side utilities
│   └── factories/              # Use case factories
└── services/
    ├── repositories/           # Repository implementations
    └── interfaces/             # Service contracts
```

## Troubleshooting

### Common Issues

1. **"Missing Supabase environment variables"**
   - Ensure `.env.local` file exists with correct values
   - Restart the development server after adding environment variables

2. **"Failed to fetch todos"**
   - Check if Supabase project is active
   - Verify database tables are created
   - Check browser console for detailed error messages

3. **"Module not found" errors**
   - Ensure all dependencies are installed: `pnpm install`
   - Check that `@supabase/supabase-js` is in package.json

4. **CORS errors**
   - Supabase handles CORS automatically for API routes
   - Ensure you're using the correct Supabase URL

5. **Old local storage data showing**
   - Visit `http://localhost:3000/clear-storage` to clean up
   - Refresh the page after clearing storage

6. **"Row-level security policy violation"**
   - Run the RLS policy fix script in Supabase SQL Editor
   - Ensure policies allow the operations you need

### Environment Variables Checklist

```bash
# Required for client-side Supabase
NEXT_PUBLIC_SUPABASE_URL=✓
NEXT_PUBLIC_SUPABASE_ANON_KEY=✓

# Required for server-side database operations
DATABASE_URL=✓
```

## Next Steps

1. **Authentication**: Implement user authentication with Supabase Auth
2. **Row Level Security**: Enable RLS policies for production
3. **Real-time**: Add real-time subscriptions for live updates
4. **File Storage**: Use Supabase Storage for file uploads
5. **Edge Functions**: Deploy serverless functions with Supabase Edge Functions

## Architecture Integration

This setup follows the hybrid architecture:

- **API Routes**: Handle database operations server-side
- **Client Store**: Manages UI state and API calls (no local storage)
- **Supabase Client**: Provides type-safe database access
- **Server-Side Safety**: All database operations are server-side only
- **Database-Only Persistence**: All data saved to Supabase, not local storage

The todo feature now has full CRUD operations with Supabase while maintaining the clean separation between client and
server concerns. All data is persisted in the database, ensuring data integrity and cross-device synchronization.
