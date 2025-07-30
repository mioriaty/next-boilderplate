# Next.js Core App

A modern Next.js application built with TypeScript, Tailwind CSS v3, shadcn/ui, and Clean Architecture principles with
pure function use cases.

## Features

- **Next.js 15** with App Router
- **TypeScript** for type safety
- **Tailwind CSS v3** for styling
- **shadcn/ui** for consistent, accessible components
- **Clean Architecture** with three layers and pure function use cases
- **Zustand** for state management
- **React Hook Form** with Zod validation
- **Jest & Testing Library** for testing
- **ESLint** for code quality
- **Prettier** for code formatting
- **Accessibility** focused components

## Tech Stack

- React 19
- Next.js 15
- TypeScript
- Tailwind CSS v3
- shadcn/ui
- Clean Architecture
- Zustand
- React Hook Form
- Zod
- Jest & Testing Library
- Radix UI
- Prettier

## Clean Architecture

This project implements Clean Architecture with three main layers and pure function use cases:

### 🟡 **Entities Layer** (`src/entities/`)

- **Models** - Core business entities (User, Todo, etc.)
- **Errors** - Custom error classes (AppError, ValidationError, etc.)

### 🔴 **Application Layer** (`src/application/`)

- **Use Cases** - Pure function business logic organized by domain:
  - `src/application/use-cases/todo/` - Todo-related use cases
  - `src/application/use-cases/user/` - User-related use cases
- **Interfaces** - Contracts for repositories and services

### 🔵 **Infrastructure Layer** (`src/infrastructure/`)

- **Repositories** - Data access implementations
- **Services** - External service implementations (Auth, etc.)

### **Pure Function Use Cases**

- **Dependency Injection** - Dependencies passed as parameters
- **Easy Testing** - No class instantiation, just function calls
- **Type Safety** - Full TypeScript support with result types
- **Predictable** - Same input always produces same output
- **Organized** - Grouped by domain for better readability

### **Dependency Flow**

```
UI Components → Pure Functions → Dependencies ← Implementations
```

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm

### Installation

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Run tests
pnpm test

# Run linting
pnpm lint

# Fix linting issues
pnpm lint:fix

# Format code
pnpm format

# Check formatting
pnpm format:check
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout component
│   ├── page.tsx           # Home page component
│   └── globals.css        # Global styles
├── entities/               # 🟡 Entities Layer
│   ├── models/            # Business entity interfaces and types
│   │   ├── user.ts        # User entity and related types
│   │   └── todo.ts        # Todo entity and related types
│   └── errors/            # Custom error classes
│       └── app-error.ts   # Base error class and specific errors
├── application/            # 🔴 Application Layer
│   ├── use-cases/         # Pure function business logic
│   │   ├── todo/          # Todo domain use cases
│   │   │   ├── create-todo.use-case.ts
│   │   │   ├── get-todos.use-case.ts
│   │   │   ├── update-todo.use-case.ts
│   │   │   ├── delete-todo.use-case.ts
│   │   │   ├── toggle-todo.use-case.ts
│   │   │   └── __tests__/ # Todo use case tests
│   │   └── user/          # User domain use cases
│   │       ├── create-user.use-case.ts
│   │       └── signin-user.use-case.ts
│   └── interfaces/        # Repository and service contracts
│       ├── user-repository.ts         # User repository interface
│       ├── todo-repository.ts         # Todo repository interface
│       └── auth-service.ts            # Auth service interface
├── infrastructure/         # 🔵 Infrastructure Layer
│   ├── repositories/      # Data access implementations
│   │   ├── user-repository.ts        # User repository implementation
│   │   └── todo-repository.ts        # Todo repository implementation
│   └── services/          # External service implementations
│       └── auth-service.ts            # Auth service implementation
├── libs/                  # Shared libraries and utilities
│   ├── components/        # Reusable UI components
│   │   ├── ui/           # shadcn/ui components
│   │   │   ├── button.tsx # Reusable button component
│   │   │   ├── input.tsx  # Reusable input component
│   │   │   ├── card.tsx   # Reusable card component
│   │   │   ├── checkbox.tsx # Reusable checkbox component
│   │   │   └── textarea.tsx # Reusable textarea component
│   │   ├── forms/        # Form components
│   │   │   ├── user-form.tsx # User registration form
│   │   │   └── todo-form.tsx # Todo creation form
│   │   └── todo/         # Todo-specific components
│   │       ├── todo-item.tsx # Individual todo item
│   │       └── todo-list.tsx # Todo list with filtering
│   ├── factories/         # Factory pattern implementations
│   │   ├── use-case-factory.ts # User use case factories
│   │   └── todo-factory.ts # Todo use case factories
│   ├── hooks/            # Custom React hooks
│   ├── utils/            # Utility functions
│   └── validations/      # Zod validation schemas
│       ├── user.validation.ts # User validation schemas
│       └── todo-validations.ts # Todo validation schemas
├── stores/               # Global state management
│   └── app.store.ts      # Zustand global state
└── types/                # TypeScript type definitions
    └── jest.d.ts         # Jest DOM matchers
```

## Dependency Injection Approaches

### **Option 1: Direct Instantiation (Simplest)**

```typescript
// In your component
const todoRepository = new InMemoryTodoRepository();

const result = await createTodoUseCase({ todoRepository }, todoData);
```

### **Option 2: Factory Pattern (Recommended)**

```typescript
// src/libs/factories/todo-factory.ts
import { createTodoUseCaseFactory } from '@/libs/factories/todo-factory';

// Usage in component
const createTodo = createTodoUseCaseFactory();
const result = await createTodo(todoData);
```

### **Option 3: DI Container (For Complex Apps)**

```typescript
// Only use when you have many dependencies and complex wiring
// Consider using a library like InversifyJS or Awilix
```

## Development Guidelines

### Clean Architecture Principles

- **Pure Functions** - Use cases are pure functions with dependencies injected
- **Dependency Injection** - Dependencies passed as parameters, not instantiated
- **Interface Contracts** - Define interfaces in application layer
- **Implementation Details** - Keep infrastructure concerns separate
- **Domain Organization** - Group use cases by domain (todo/, user/)

### Code Organization

- **File Naming** - Use cases follow `*.use-case.ts` pattern
- **Domain Folders** - Group related use cases in domain folders
- **Testing** - Test use cases as pure functions with mock dependencies
- **Error Handling** - Use custom error classes from entities layer
- **Type Safety** - Define clear interfaces and result types

### Testing Strategy

- **Unit Tests** - Test use cases as pure functions
- **Mock Dependencies** - Easy to mock repositories and services
- **Isolated Testing** - Test business logic without infrastructure
- **Comprehensive Coverage** - Test all validation and error scenarios

### Code Style

- Follow TypeScript best practices
- Use functional programming patterns
- Implement proper error handling with custom error classes
- Write comprehensive tests for use cases
- Follow accessibility guidelines
- Use semantic HTML
- Implement responsive design
- Use shadcn/ui components for consistency
- Format code with Prettier on save

## Code Formatting

The project uses Prettier for consistent code formatting:

- **Auto-format on save** - VS Code settings configured
- **ESLint integration** - Prettier rules integrated with ESLint
- **Consistent style** - Tabs, single quotes, no semicolons, 80 char line length

## Testing

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage
```

## Contributing

1. Follow Clean Architecture principles with pure function use cases
2. Write tests for use cases as pure functions
3. Ensure accessibility compliance
4. Update documentation as needed
5. Format code before committing

## License

MIT
