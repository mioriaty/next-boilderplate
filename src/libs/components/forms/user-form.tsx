'use client';

import { Button } from '@/libs/components/ui/button';
import { Input } from '@/libs/components/ui/input';
import { createUserUseCaseFactory } from '@/libs/factories/use-case-factory';
import { type UserFormData, userSchema } from '@/libs/validations/user.validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface UserFormProps {
  onSubmit?: (data: UserFormData) => void;
}

export function UserForm({ onSubmit }: UserFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema)
  });

  const createUser = createUserUseCaseFactory();

  const onFormSubmit = async (data: UserFormData) => {
    try {
      setIsLoading(true);
      setError(null);
      setSuccess(null);

      await createUser(data);
      setSuccess('User created successfully!');
      reset();
      onSubmit?.(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create user');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
      <div>
        <Input {...register('name')} placeholder="Enter your name" disabled={isLoading} />
        {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>}
      </div>

      <div>
        <Input {...register('email')} type="email" placeholder="Enter your email" disabled={isLoading} />
        {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
      </div>

      <div>
        <Input {...register('password')} type="password" placeholder="Enter your password" disabled={isLoading} />
        {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>}
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      {success && <p className="text-sm text-green-500">{success}</p>}

      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? 'Creating...' : 'Create User'}
      </Button>
    </form>
  );
}
