'use client';

import { useTodoStore } from '@/features/todos/store';
import { type CreateTodoInput, createTodoSchema } from '@/features/todos/validations';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Textarea } from '@/shared/components/ui/textarea';

export function TodoForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { createTodo, error, clearError } = useTodoStore();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<CreateTodoInput>({
    resolver: zodResolver(createTodoSchema)
  });

  const onSubmit = async (data: CreateTodoInput) => {
    try {
      setIsSubmitting(true);
      clearError();
      await createTodo(data);
      reset();
    } catch (error) {
      console.error('Failed to create todo:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Input {...register('title')} placeholder="Enter todo title" className={errors.title ? 'border-red-500' : ''} />
        {errors.title && <p className="text-sm text-red-500 mt-1">{errors.title.message}</p>}
      </div>

      <div>
        <Textarea
          {...register('description')}
          placeholder="Enter todo description (optional)"
          className={errors.description ? 'border-red-500' : ''}
        />
        {errors.description && <p className="text-sm text-red-500 mt-1">{errors.description.message}</p>}
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? 'Creating...' : 'Create Todo'}
      </Button>
    </form>
  );
}
