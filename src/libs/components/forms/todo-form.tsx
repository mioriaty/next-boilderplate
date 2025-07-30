// src/libs/components/forms/todo-form.tsx
'use client';

import { Button } from '@/libs/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/libs/components/ui/card';
import { Input } from '@/libs/components/ui/input';
import { Textarea } from '@/libs/components/ui/textarea';
import { type CreateTodoFormData, createTodoSchema } from '@/libs/validations/todo-validations';
import { useTodoStore } from '@/stores/todo.store';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

// src/libs/components/forms/todo-form.tsx

interface TodoFormProps {
  onTodoCreated?: () => void;
}

export function TodoForm({ onTodoCreated }: TodoFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<CreateTodoFormData>({
    resolver: zodResolver(createTodoSchema)
  });

  const { createTodo, error, clearError } = useTodoStore();

  const onSubmit = async (data: CreateTodoFormData) => {
    try {
      setIsSubmitting(true);
      clearError();

      await createTodo(data);
      reset();
      onTodoCreated?.();
    } catch (err) {
      // Error is handled by the store
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Add New Todo</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Input {...register('title')} placeholder="Enter todo title" disabled={isSubmitting} />
            {errors.title && <p className="text-sm text-red-500 mt-1">{errors.title.message}</p>}
          </div>

          <div>
            <Textarea
              {...register('description')}
              placeholder="Enter description (optional)"
              disabled={isSubmitting}
              rows={3}
            />
            {errors.description && <p className="text-sm text-red-500 mt-1">{errors.description.message}</p>}
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? 'Creating...' : 'Create Todo'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
