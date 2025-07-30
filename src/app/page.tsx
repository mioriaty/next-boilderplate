'use client';

import { TodoForm } from '@/libs/components/forms/todo-form';
import { TodoList } from '@/libs/components/todo/todo-list';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold tracking-tight">Todo App</h1>
            <p className="text-muted-foreground mt-2">
              Built with Clean Architecture, Zustand, and pure function use cases
            </p>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Todo Form */}
            <div className="lg:col-span-1">
              <TodoForm />
            </div>

            {/* Todo List */}
            <div className="lg:col-span-2">
              <TodoList />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
