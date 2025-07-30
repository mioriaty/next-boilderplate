// src/components/forms/user-form.tsx
'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { userSchema, type UserFormData } from '@/lib/validations'
import { DIContainer } from '@/lib/di-container'
import { ValidationError } from '@/entities/errors/app-error'

interface UserFormProps {
	onSubmit?: (data: UserFormData) => void
	isLoading?: boolean
}

/**
 * User registration form component with Clean Architecture integration
 */
export function UserForm({ onSubmit, isLoading = false }: UserFormProps) {
	const [error, setError] = useState<string | null>(null)
	const [success, setSuccess] = useState<string | null>(null)

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<UserFormData>({
		resolver: zodResolver(userSchema),
	})

	const handleFormSubmit = async (data: UserFormData) => {
		try {
			setError(null)
			setSuccess(null)

			// Get use case from DI container
			const createUser = DIContainer.getInstance().getCreateUserUseCase()

			// Execute use case
			const result = await createUser(data)

			setSuccess(`User created successfully! ID: ${result.user.id}`)
			reset()

			// Call parent onSubmit if provided
			if (onSubmit) {
				onSubmit(data)
			}
		} catch (err) {
			if (err instanceof ValidationError) {
				setError(err.message)
			} else {
				setError('An unexpected error occurred')
			}
		}
	}

	return (
		<form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
			{error && (
				<div className="p-3 text-sm text-red-600 bg-red-50 rounded-md">
					{error}
				</div>
			)}

			{success && (
				<div className="p-3 text-sm text-green-600 bg-green-50 rounded-md">
					{success}
				</div>
			)}

			<div>
				<Input
					{...register('name')}
					placeholder="Enter your name"
					aria-describedby="name-error"
				/>
				{errors.name && (
					<p id="name-error" className="mt-1 text-sm text-red-600">
						{errors.name.message}
					</p>
				)}
			</div>

			<div>
				<Input
					{...register('email')}
					type="email"
					placeholder="Enter your email"
					aria-describedby="email-error"
				/>
				{errors.email && (
					<p id="email-error" className="mt-1 text-sm text-red-600">
						{errors.email.message}
					</p>
				)}
			</div>

			<div>
				<Input
					{...register('password')}
					type="password"
					placeholder="Enter your password"
					aria-describedby="password-error"
				/>
				{errors.password && (
					<p id="password-error" className="mt-1 text-sm text-red-600">
						{errors.password.message}
					</p>
				)}
			</div>

			<Button type="submit" disabled={isLoading}>
				{isLoading ? 'Submitting...' : 'Submit'}
			</Button>
		</form>
	)
}
