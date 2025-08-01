'use client';

import { TodoList } from '@/features/todos/components/todo-list';

import { TodoForm } from '@/shared/components/forms/todo-form';

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Todo App</h1>

      <div className="max-w-2xl mx-auto space-y-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Add New Todo</h2>
          <TodoForm />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Your Todos</h2>
          <TodoList />
        </div>
      </div>
    </div>
  );
}
