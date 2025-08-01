# Next.js Core App

A modern Next.js application built with TypeScript, Tailwind CSS v3, shadcn/ui, and a simplified hybrid architecture
that balances Clean Architecture principles with practical development needs.

## Features

- **Next.js 15** with App Router
- **TypeScript** for type safety
- **Tailwind CSS v3** for styling
- **shadcn/ui** for consistent, accessible components
- **Hybrid Architecture** - Feature-based organization with shared utilities
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
- Hybrid Architecture
- Zustand
- React Hook Form
- Zod
- Jest & Testing Library
- Radix UI
- Prettier

## Hybrid Architecture

This project uses a hybrid architecture that combines feature-based organization with shared utilities:

### 🏗️ **Project Structure**

```
src/
├── app/                   # Next.js App Router
│   ├── layout.tsx         # Root layout component
│   ├── page.tsx           # Home page component
│   └── globals.css        # Global styles
├── features/              # Feature-based organization
│   ├── todos/             # Todo feature
│   │   ├── components/    # Todo-specific components
│   │   ├── services/      # Todo business logic
│   │   ├── store.ts       # Todo state management
│   │   ├── types.ts       # Todo type definitions
│   │   └── validations.ts # Todo validation schemas
│   └── users/             # User feature
│       ├── components/    # User-specific components
│       ├── services/      # User business logic
│       ├── store.ts       # User state management
│       ├── types.ts       # User type definitions
│       └── validations.ts # User validation schemas
├── shared/                # Shared utilities and components
│   ├── components/        # Reusable UI components
│   │   ├── ui/            # shadcn/ui components
│   │   └── forms/         # Form components
│   ├── hooks/             # Custom React hooks
│   ├── utils/             # Utility functions
│   └── validations/       # Shared validation schemas
├── services/              # Data access and external services
│   ├── repositories/      # Data access implementations
│   └── interfaces/        # Service contracts
├── models/                # Core business models and types
│   ├── todo.ts            # Todo entity
│   ├── user.ts            # User entity
│   └── errors/            # Custom error classes
├── stores/                # Global state management
└── types/                 # Global TypeScript definitions
```

### 🎯 **Architecture Principles**

- **Feature-First**: Each feature is self-contained with its own components, services, and state
- **Shared Utilities**: Common code is centralized in `shared/`
- **Clean Separation**: Business logic in services, UI in components
- **Type Safety**: Comprehensive TypeScript usage throughout
- **Pure Functions**: Business logic implemented as pure functions
- **Dependency Injection**: Services accept dependencies as parameters

### 📁 **Directory Guidelines**

#### **Features** (`src/features/`)

- **Self-contained**: Each feature has everything it needs
- **Components**: Feature-specific UI components
- **Services**: Business logic and data access
- **Store**: Feature-specific state management
- **Types**: Feature-specific type definitions
- **Validations**: Feature-specific validation schemas

#### **Shared** (`src/shared/`)

- **Components**: Reusable UI components (shadcn/ui, forms)
- **Hooks**: Custom React hooks used across features
- **Utils**: Utility functions and helpers
- **Validations**: Shared validation schemas

#### **Services** (`src/services/`)

- **Repositories**: Data access implementations
- **Interfaces**: Service contracts and types
- **External APIs**: Third-party service integrations

#### **Models** (`src/models/`)

- **Entities**: Core business models (User, Todo)
- **Errors**: Custom error classes
- **Types**: Global type definitions

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

## Development Guidelines

### Feature Development

1. **Create Feature Structure**:

   ```bash
   src/features/your-feature/
   ├── components/
   ├── services/
   ├── store.ts
   ├── types.ts
   └── validations.ts
   ```

2. **Implement Business Logic**:

   ```typescript
   // src/features/todos/services/create-todo.use-case.ts
   export async function createTodoUseCase(
     dependencies: { todoRepository: TodoRepository },
     data: CreateTodoInput
   ): Promise<Result<Todo, AppError>> {
     // Pure function implementation
   }
   ```

3. **Add State Management**:

   ```typescript
   // src/features/todos/store.ts
   export const useTodoStore = create<TodoStore>((set) => ({
     // State and actions
   }));
   ```

4. **Create Components**:
   ```typescript
   // src/features/todos/components/todo-form.tsx
   export function TodoForm() {
     // Component implementation
   }
   ```

### Code Organization

- **File Naming**: Use kebab-case for files, camelCase for functions
- **Component Naming**: Use PascalCase for components
- **Type Definitions**: Place in `types.ts` within each feature
- **Validation**: Use Zod schemas in `validations.ts`
- **Testing**: Place tests next to the files they test

### State Management

- **Feature Stores**: Use Zustand for feature-specific state
- **Global State**: Use shared stores for cross-feature state
- **Server State**: Use React Query or SWR for server state
- **Form State**: Use React Hook Form for form state

### Testing Strategy

- **Unit Tests**: Test services as pure functions
- **Component Tests**: Test UI components with React Testing Library
- **Integration Tests**: Test feature workflows
- **Mock Dependencies**: Use dependency injection for easy mocking

### Code Style

- Follow TypeScript best practices
- Use functional programming patterns
- Implement proper error handling
- Write comprehensive tests
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

1. Follow the hybrid architecture principles
2. Keep features self-contained
3. Share common code in `shared/`
4. Write tests for business logic and components
5. Ensure accessibility compliance
6. Update documentation as needed
7. Format code before committing

## License

MIT
