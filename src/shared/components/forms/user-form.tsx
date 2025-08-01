'use client';

import { useUserStore } from '@/features/users/store';
import { type CreateUserInput, createUserSchema } from '@/features/users/validations';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';

export function UserForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const { createUser, error, clearError } = useUserStore();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<CreateUserInput>({
    resolver: zodResolver(createUserSchema)
  });

  const onSubmit = async (data: CreateUserInput) => {
    try {
      setIsSubmitting(true);
      clearError();
      setSuccessMessage('');
      await createUser(data);
      setSuccessMessage('User created successfully!');
      reset();
    } catch (error) {
      console.error('Failed to create user:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Input {...register('name')} placeholder="Enter your name" className={errors.name ? 'border-red-500' : ''} />
        {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>}
      </div>

      <div>
        <Input
          {...register('email')}
          type="email"
          placeholder="Enter your email"
          className={errors.email ? 'border-red-500' : ''}
        />
        {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
      </div>

      <div>
        <Input
          {...register('password')}
          type="password"
          placeholder="Enter your password"
          className={errors.password ? 'border-red-500' : ''}
        />
        {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>}
      </div>

      {successMessage && <p className="text-sm text-green-500">{successMessage}</p>}

      {error && <p className="text-sm text-red-500">{error}</p>}

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? 'Creating...' : 'Create User'}
      </Button>
    </form>
  );
}
