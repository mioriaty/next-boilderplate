'use client';

import { useTodoStore } from '@/features/todo/store';
import { createTodoSchema } from '@/features/todo/validations';
import { useState } from 'react';

import { Alert, AlertDescription } from '@/shared/components/ui/alert';
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Input } from '@/shared/components/ui/input';

import { TodoList } from './todo-list';

export function TodoContainer() {
  const { addTodo } = useTodoStore();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleAdd = () => {
    const result = createTodoSchema.safeParse({ title, description });
    if (!result.success) {
      setError(result.error.issues[0]?.message || 'Invalid input');
      return;
    }
    addTodo({
      id: Date.now().toString(),
      title,
      description,
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    setTitle('');
    setDescription('');
    setError(null);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Todo Feature Example</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Add Todo Form */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
            <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} className="flex-1" />
            <Input
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleAdd} className="sm:w-auto">
              Add Todo
            </Button>
          </div>
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <TodoList />
        </CardContent>
      </Card>
    </div>
  );
}
