# Next.js Core with Clean Architecture

A modern Next.js application built with Clean Architecture principles, featuring Drizzle ORM, PostgreSQL, and Supabase
integration.

## 🚀 Features

- **Next.js 15** with App Router
- **TypeScript** for type safety
- **Clean Architecture** with pure function use cases
- **Drizzle ORM** with PostgreSQL
- **Supabase** for authentication and real-time features
- **Zustand** for state management
- **Shadcn UI** for beautiful components
- **Tailwind CSS** for styling
- **Jest & React Testing Library** for testing
- **ESLint & Prettier** for code quality

## 🏗️ Architecture

### Clean Architecture Layers

```
src/
├── entities/           # 🟡 Business entities and models
├── application/        # 🔴 Use cases and interfaces
├── infrastructure/     # 🔵 Database and external services
├── libs/              # Shared utilities and components
└── stores/            # Global state management
```

### Database Setup

The project uses **Drizzle ORM** with **PostgreSQL** and **Supabase**:

- **Schema**: `src/libs/database/schema.ts`
- **Connection**: `src/libs/database/connection.ts`
- **Supabase**: `src/libs/database/supabase.ts`

## 📦 Installation

```bash
# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your database and Supabase credentials

# Generate database migrations
pnpm db:generate

# Push schema to database
pnpm db:push
```

## 🛠️ Development

```bash
# Start development server
pnpm dev

# Run tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Lint and fix
pnpm lint:fix

# Format code
pnpm format
```

## 🗄️ Database Commands

```bash
# Generate migrations
pnpm db:generate

# Push schema changes
pnpm db:push

# Run migrations
pnpm db:migrate

# Open Drizzle Studio
pnpm db:studio
```

## 🔧 Environment Variables

Create a `.env.local` file:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/database"

# Supabase
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
```

## 📚 Documentation

- [Database Setup](./DATABASE_SETUP.md) - Complete database configuration guide
- [Architecture](./ARCHITECTURE.md) - Detailed architecture documentation

## 🧪 Testing

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Generate coverage report
pnpm test:coverage
```

## 🚀 Deployment

1. Set up your PostgreSQL database (Supabase recommended)
2. Configure environment variables
3. Run database migrations
4. Deploy to your preferred platform

## 📝 License

MIT
