# Architecture Documentation

## Overview

This project uses a **Hybrid Architecture** that combines feature-based organization with shared utilities. This
approach balances Clean Architecture principles with practical development needs for medium-sized projects.

## Architecture Principles

### 🎯 **Core Principles**

1. **Feature-First Organization**: Each feature is self-contained with its own components, services, and state
2. **Shared Utilities**: Common code is centralized in `shared/` for reuse across features
3. **Clean Separation**: Business logic in services, UI in components
4. **Type Safety**: Comprehensive TypeScript usage throughout
5. **Pure Functions**: Business logic implemented as pure functions with dependency injection
6. **Scalable Structure**: Easy to add new features without affecting existing ones
7. **Server-Side Safety**: Database operations are server-side only with proper protection
8. **Client-Side Simplicity**: Client stores focus on UI state, database operations via API routes
9. **Database-Only Persistence**: All data saved to Supabase, no local storage dependencies

### 🏗️ **Directory Structure**

```
src/
├── app/                   # Next.js App Router
│   ├── api/              # API routes for database operations
│   │   ├── todos/        # Todo API endpoints
│   │   └── users/        # User API endpoints
│   ├── clear-storage/    # Utility to clear local storage
│   ├── test-todos/       # Test page for Supabase integration
│   └── todos/            # Sample Supabase integration page
├── features/              # Feature-based organization
│   ├── todos/             # Todo feature
│   │   ├── components/    # Feature-specific UI components
│   │   ├── services/      # Business logic (use cases)
│   │   ├── store.ts       # Feature-specific state management
│   │   ├── types.ts       # Feature-specific type definitions
│   │   └── validations.ts # Feature-specific validation schemas
│   └── users/             # User feature
├── shared/                # Shared utilities and components
│   ├── components/        # Reusable UI components
│   ├── database/          # Database configuration and schemas
│   │   ├── schemas/       # Domain-specific schemas
│   │   ├── connection.ts  # Database connection (server-only)
│   │   ├── supabase-client.ts # Supabase client configuration
│   │   └── server-only.ts # Server-side utilities
│   └── factories/         # Use case factories
├── services/              # Data access and external services
│   ├── repositories/      # Repository implementations
│   └── interfaces/        # Service contracts
├── models/                # Core business models and types
└── types/                 # Global TypeScript definitions
```

## Detailed Structure

### 📁 **Features** (`src/features/`)

Each feature is self-contained and includes:

```
features/todos/
├── components/            # Feature-specific UI components
│   ├── todo-item.tsx
│   ├── todo-list.tsx
│   └── todo-form.tsx
├── services/              # Business logic and data access
│   ├── create-todo.use-case.ts
│   ├── get-todos.use-case.ts
│   ├── update-todo.use-case.ts
│   └── delete-todo.use-case.ts
├── store.ts               # Feature-specific state management
├── types.ts               # Feature-specific type definitions
└── validations.ts         # Feature-specific validation schemas
```

**Guidelines:**

- Keep features self-contained
- Use descriptive file names
- Group related functionality together
- Test each feature independently
- Keep client-side stores simple (no direct database access)
- Use API routes for all database operations

### 📁 **API Routes** (`src/app/api/`)

Database operations via Next.js API routes:

```
app/api/
├── todos/
│   ├── route.ts           # GET /api/todos, POST /api/todos
│   └── [id]/
│       └── route.ts       # GET, PUT, DELETE, PATCH /api/todos/[id]
└── users/
    ├── route.ts           # User API endpoints
    └── [id]/
        └── route.ts       # Individual user operations
```

**Guidelines:**

- Handle all database operations server-side
- Use Supabase client for database access
- Implement proper error handling
- Return consistent JSON responses
- Use TypeScript for type safety

### 📁 **Shared** (`src/shared/`)

Common utilities used across features:

```
shared/
├── components/            # Reusable UI components
│   ├── ui/               # shadcn/ui components
│   └── forms/            # Form components
├── database/             # Database configuration
│   ├── schemas/          # Domain-specific schemas
│   │   ├── users.ts      # User domain schema
│   │   └── todos.ts      # Todo domain schema
│   ├── connection.ts     # Database connection (server-only)
│   ├── supabase-client.ts # Supabase client configuration
│   └── server-only.ts    # Server-side utilities
└── factories/            # Use case factories
    ├── todo-factory.ts   # Todo use case factories
    └── user-factory.ts   # User use case factories
```

**Guidelines:**

- Only add code that's used by multiple features
- Keep utilities generic and reusable
- Document complex utilities
- Test shared code thoroughly
- Use server-only protection for database operations

### 📁 **Services** (`src/services/`)

Data access and external service integrations:

```
services/
├── repositories/          # Data access implementations
│   ├── todo-repository.ts
│   └── user-repository.ts
└── interfaces/            # Service contracts
    ├── todo-repository.ts
    └── user-repository.ts
```

**Guidelines:**

- Implement repository pattern for data access
- Use interfaces for service contracts
- Keep external API calls isolated
- Handle errors consistently
- Use server-only protection for database operations

### 📁 **Models** (`src/models/`)

Core business models and types:

```
models/
├── todo.ts               # Todo entity
├── user.ts               # User entity
└── errors/               # Custom error classes
    └── app-error.ts
```

**Guidelines:**

- Define core business entities
- Use TypeScript interfaces for type safety
- Create custom error classes for domain errors
- Keep models simple and focused

## Database Architecture

### 🗄️ **Schema Organization**

```
src/shared/database/
├── schemas/
│   ├── index.ts          # Re-exports all schemas
│   ├── users.ts          # User domain schema
│   └── todos.ts          # Todo domain schema
├── connection.ts          # Database connection (server-only)
├── supabase-client.ts    # Supabase client configuration
└── server-only.ts        # Server-side utilities
```

### 🔒 **Server-Side Safety**

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

### 🏭 **Factory Pattern**

```typescript
// src/shared/factories/todo-factory.ts
export function createTodoUseCaseFactory() {
  const todoRepository = new DrizzleTodoRepository();
  return (data: CreateTodoData) => createTodoUseCase({ todoRepository }, data);
}
```

## API Routes Pattern

### 📡 **Database Operations via API Routes**

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

## State Management Pattern

### 🔄 **Client-Side State Management**

```typescript
// Feature-specific store (client-side only, no local storage)
export const useTodoStore = create<TodoStore>((set, get) => ({
  todos: [],
  isLoading: false,
  error: null,

  // Load todos from API
  loadTodos: async (filters?: TodoFilters) => {
    try {
      set({ isLoading: true, error: null });
      const response = await fetch(`/api/todos?${params.toString()}`);
      const todos = await response.json();
      set({ todos, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  // Create todo via API
  createTodo: async (data: CreateTodoData) => {
    try {
      set({ isLoading: true, error: null });
      const response = await fetch('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const newTodo = await response.json();
      set((state) => ({
        todos: [newTodo, ...state.todos],
        isLoading: false
      }));
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  }
  // ... other actions
}));
```

## Development Patterns

### 🔧 **Feature Development Pattern**

1. **Create Feature Structure**:

   ```bash
   mkdir -p src/features/new-feature/{components,services}
   touch src/features/new-feature/{store,types,validations}.ts
   ```

2. **Define Types**:

   ```typescript
   // src/features/new-feature/types.ts
   export interface NewFeatureData {
     id: string;
     name: string;
     // ... other properties
   }
   ```

3. **Create Validation Schemas**:

   ```typescript
   // src/features/new-feature/validations.ts
   import { z } from 'zod';

   export const newFeatureSchema = z.object({
     name: z.string().min(1, 'Name is required')
     // ... other validations
   });
   ```

4. **Implement Business Logic**:

   ```typescript
   // src/features/new-feature/services/create-new-feature.use-case.ts
   export async function createNewFeatureUseCase(
     dependencies: { repository: NewFeatureRepository },
     data: CreateNewFeatureInput
   ): Promise<Result<NewFeature, AppError>> {
     // Pure function implementation
   }
   ```

5. **Add State Management**:

   ```typescript
   // src/features/new-feature/store.ts
   export const useNewFeatureStore = create<NewFeatureStore>((set) => ({
     // Client-side state only, API calls for persistence
   }));
   ```

6. **Create API Routes**:

   ```typescript
   // src/app/api/new-feature/route.ts
   export async function GET() {
     // Handle GET requests
   }

   export async function POST(request: NextRequest) {
     // Handle POST requests
   }
   ```

7. **Create Components**:
   ```typescript
   // src/features/new-feature/components/new-feature-form.tsx
   export function NewFeatureForm() {
     // Component implementation
   }
   ```

### 🎯 **Service Pattern**

```typescript
// Pure function with dependency injection
export async function createTodoUseCase(
  dependencies: { todoRepository: TodoRepository },
  data: CreateTodoInput
): Promise<Result<Todo, AppError>> {
  try {
    // Validate input
    const validatedData = createTodoSchema.parse(data);

    // Business logic
    const todo = await dependencies.todoRepository.create(validatedData);

    return { success: true, data: todo };
  } catch (error) {
    return { success: false, error: handleError(error) };
  }
}
```

### 🧪 **Testing Pattern**

```typescript
// Test business logic as pure functions
describe('createTodoUseCase', () => {
  it('should create a todo successfully', async () => {
    const mockRepository = {
      create: jest.fn().mockResolvedValue(mockTodo)
    };

    const result = await createTodoUseCase({ todoRepository: mockRepository }, validTodoData);

    expect(result.success).toBe(true);
    expect(result.data).toEqual(mockTodo);
  });
});
```

## Migration Guide

### From Clean Architecture to Hybrid

1. **Move Use Cases**: `src/application/use-cases/todo/` → `src/features/todos/services/`
2. **Move Components**: `src/libs/components/todo/` → `src/features/todos/components/`
3. **Move Shared Code**: `src/libs/` → `src/shared/`
4. **Move Models**: `src/entities/models/` → `src/models/`
5. **Update Imports**: Update all import paths to reflect new structure
6. **Add Server-Side Protection**: Use `serverOnly()` for database operations
7. **Create API Routes**: Move database operations to Next.js API routes
8. **Remove Local Storage**: Use database-only persistence

### Benefits of Migration

- **Simplified Navigation**: Easier to find feature-related code
- **Better Scalability**: New features don't affect existing ones
- **Reduced Complexity**: Less abstraction layers
- **Improved Developer Experience**: More intuitive structure
- **Server-Side Safety**: Proper separation of client and server concerns
- **Database-Only Persistence**: All data saved to Supabase, no local storage

## Best Practices

### ✅ **Do's**

- Keep features self-contained
- Use shared utilities for common code
- Implement pure functions for business logic
- Use TypeScript for type safety
- Write comprehensive tests
- Follow consistent naming conventions
- Document complex business logic
- Separate client and server concerns
- Use server-only utilities for database operations
- Organize schemas by domain
- Use API routes for all database operations
- Implement proper error handling in API routes

### ❌ **Don'ts**

- Don't create deep nesting
- Don't duplicate code across features
- Don't mix UI and business logic
- Don't skip error handling
- Don't ignore TypeScript errors
- Don't forget to test shared utilities
- Don't import server-side modules on the client
- Don't mix client and server state management
- Don't create overly complex database schemas
- Don't use local storage for persistence
- Don't handle database operations on the client side

## Scaling Considerations

### **Small Projects** (< 5 features)

- Use the current structure as-is
- Keep everything simple

### **Medium Projects** (5-15 features)

- Consider grouping related features
- Add feature-specific documentation

### **Large Projects** (> 15 features)

- Consider domain-based grouping
- Add architectural documentation
- Implement stricter guidelines

## Conclusion

The hybrid architecture provides a balanced approach that:

- Maintains Clean Architecture principles
- Simplifies development for medium projects
- Scales well as the project grows
- Provides clear separation of concerns
- Enables easy testing and maintenance
- Properly separates client and server concerns
- Ensures database operations are server-side only
- Uses database-only persistence for data integrity
