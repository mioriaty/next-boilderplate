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

- **Models** - Core business entities (User, etc.)
- **Errors** - Custom error classes (AppError, ValidationError, etc.)

### 🔴 **Application Layer** (`src/application/`)

- **Use Cases** - Pure function business logic (`create-user.use-case.ts`, `signin-user.use-case.ts`)
- **Interfaces** - Contracts for repositories and services

### 🔵 **Infrastructure Layer** (`src/infrastructure/`)

- **Repositories** - Data access implementations
- **Services** - External service implementations (Auth, etc.)

### **Pure Function Use Cases**

- **Dependency Injection** - Dependencies passed as parameters
- **Easy Testing** - No class instantiation, just function calls
- **Type Safety** - Full TypeScript support with result types
- **Predictable** - Same input always produces same output

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
│   │   └── user.ts        # User entity and related types
│   └── errors/            # Custom error classes
│       └── app-error.ts   # Base error class and specific errors
├── application/            # 🔴 Application Layer
│   ├── use-cases/         # Pure function business logic
│   │   ├── create-user.use-case.ts    # Create user use case
│   │   ├── signin-user.use-case.ts    # Signin user use case
│   │   └── __tests__/     # Use case tests
│   └── interfaces/        # Repository and service contracts
│       ├── user-repository.ts         # User repository interface
│       └── auth-service.ts            # Auth service interface
├── infrastructure/         # 🔵 Infrastructure Layer
│   ├── repositories/      # Data access implementations
│   │   └── user-repository.ts        # User repository implementation
│   └── services/          # External service implementations
│       └── auth-service.ts            # Auth service implementation
├── libs/                  # Shared libraries and utilities
│   ├── components/        # Reusable UI components
│   │   ├── ui/           # shadcn/ui components
│   │   │   ├── button.tsx # Reusable button component
│   │   │   ├── input.tsx  # Reusable input component
│   │   │   └── card.tsx   # Reusable card component
│   │   └── forms/        # Form components
│   │       ├── user-form.tsx # User registration form
│   │       └── __tests__/ # Form component tests
│   ├── factories/         # Factory pattern implementations
│   │   └── use-case-factory.ts # Use case factories
│   ├── hooks/            # Custom React hooks
│   ├── utils/            # Utility functions
│   └── validations/      # Zod validation schemas
├── stores/               # Global state management
│   └── app.store.ts      # Zustand global state
└── types/                # TypeScript type definitions
    └── jest.d.ts         # Jest DOM matchers
```

## Dependency Injection Approaches

### **Option 1: Direct Instantiation (Simplest)**

```typescript
// In your component
const userRepository = new InMemoryUserRepository();
const authService = new JwtAuthService();

const result = await createUserUseCase({ userRepository, authService }, userData);
```

### **Option 2: Factory Pattern (Recommended)**

```typescript
// src/libs/factories/use-case-factory.ts
import { createUserUseCaseFactory } from '@/libs/factories/use-case-factory';

// Usage in component
const createUser = createUserUseCaseFactory();
const result = await createUser(userData);
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

### Code Organization

- **File Naming** - Use cases follow `*.use-case.ts` pattern
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
