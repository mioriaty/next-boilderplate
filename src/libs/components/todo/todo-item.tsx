'use client';

import { Todo } from '@/entities/models/todo';
import { Button } from '@/libs/components/ui/button';
import { Card, CardContent } from '@/libs/components/ui/card';
import { Checkbox } from '@/libs/components/ui/checkbox';
import { Input } from '@/libs/components/ui/input';
import { Textarea } from '@/libs/components/ui/textarea';
import { type UpdateTodoFormData, updateTodoSchema } from '@/libs/validations/todo-validations';
import { useTodoStore } from '@/stores/todo.store';
import { zodResolver } from '@hookform/resolvers/zod';
import { isDate } from 'lodash';
import { Edit, Save, Trash2, X } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface TodoItemProps {
  todo: Todo;
}

export function TodoItem({ todo }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<UpdateTodoFormData>({
    resolver: zodResolver(updateTodoSchema),
    defaultValues: {
      title: todo.title,
      description: todo.description
    }
  });

  const { updateTodo, deleteTodo, toggleTodo, error, clearError } = useTodoStore();

  const handleToggle = async () => {
    try {
      setIsSubmitting(true);
      clearError();
      await toggleTodo(todo.id);
    } catch (err) {
      // Error is handled by the store
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdate = async (data: UpdateTodoFormData) => {
    try {
      setIsSubmitting(true);
      clearError();
      await updateTodo(todo.id, data);
      setIsEditing(false);
    } catch (err) {
      // Error is handled by the store
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    try {
      setIsSubmitting(true);
      clearError();
      await deleteTodo(todo.id);
    } catch (err) {
      // Error is handled by the store
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isEditing) {
    return (
      <Card className="w-full">
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit(handleUpdate)} className="space-y-4">
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

            <div className="flex gap-2">
              <Button type="submit" disabled={isSubmitting} size="sm">
                <Save className="h-4 w-4 mr-1" />
                Save
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsEditing(false)}
                disabled={isSubmitting}
                size="sm"
              >
                <X className="h-4 w-4 mr-1" />
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`w-full ${todo.completed ? 'opacity-75' : ''}`}>
      <CardContent className="pt-6">
        <div className="flex items-start gap-3">
          <Checkbox checked={todo.completed} onCheckedChange={handleToggle} disabled={isSubmitting} className="mt-1" />

          <div className="flex-1 min-w-0">
            <h3 className={`font-medium ${todo.completed ? 'line-through text-muted-foreground' : ''}`}>
              {todo.title}
            </h3>
            {todo.description && (
              <p className={`text-sm text-muted-foreground mt-1 ${todo.completed ? 'line-through' : ''}`}>
                {todo.description}
              </p>
            )}

            {isDate(todo.createdAt) ? (
              <p className="text-xs text-muted-foreground mt-2">Created: {todo.createdAt.toLocaleDateString()}</p>
            ) : (
              <p className="text-xs text-muted-foreground mt-2">
                Created: {new Date(todo.createdAt).toLocaleDateString()}
              </p>
            )}
          </div>

          <div className="flex gap-1">
            <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)} disabled={isSubmitting}>
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDelete}
              disabled={isSubmitting}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
      </CardContent>
    </Card>
  );
}
