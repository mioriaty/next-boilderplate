// src/application/use-cases/signin-user.use-case.ts
import { UserRepository } from '@/application/interfaces/user-repository'
import { AuthService } from '@/application/interfaces/auth-service'
import { UserCredentials, User } from '@/entities/models/user'
import { ValidationError, UnauthorizedError } from '@/entities/errors/app-error'

export interface SigninUserDependencies {
	userRepository: UserRepository
	authService: AuthService
}

export interface SigninUserResult {
	user: User
	token: string
}

/**
 * Pure function use case for signing in a user
 */
export async function signinUserUseCase(
	dependencies: SigninUserDependencies,
	credentials: UserCredentials
): Promise<SigninUserResult> {
	// Validate input
	if (!credentials.email || !isValidEmail(credentials.email)) {
		throw new ValidationError('Invalid email address')
	}

	if (!credentials.password) {
		throw new ValidationError('Password is required')
	}

	// Find user by email
	const user = await dependencies.userRepository.findByEmail(credentials.email)
	if (!user) {
		throw new UnauthorizedError('Invalid email or password')
	}

	// Verify password (assuming we have a way to get hashed password)
	// This is a simplified version - in real implementation you'd need to handle password verification
	const isValidPassword = await dependencies.authService.comparePassword(
		credentials.password,
		user.password || ''
	)

	if (!isValidPassword) {
		throw new UnauthorizedError('Invalid email or password')
	}

	// Generate token
	const token = await dependencies.authService.generateToken(user)

	return { user, token }
}

function isValidEmail(email: string): boolean {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
	return emailRegex.test(email)
}
