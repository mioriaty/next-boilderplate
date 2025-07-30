// src/lib/di-container.ts
import { UserRepository } from '@/application/interfaces/user-repository'
import { AuthService } from '@/application/interfaces/auth-service'
import {
	createUserUseCase,
	CreateUserDependencies,
} from '@/application/use-cases/create-user.use-case'
import {
	signinUserUseCase,
	SigninUserDependencies,
} from '@/application/use-cases/signin-user.use-case'
import { InMemoryUserRepository } from '@/infrastructure/repositories/user-repository'
import { JwtAuthService } from '@/infrastructure/services/auth-service'

/**
 * Dependency Injection Container
 * Wires up the Clean Architecture layers
 */
export class DIContainer {
	private static instance: DIContainer
	private userRepository: UserRepository
	private authService: AuthService

	private constructor() {
		// Initialize infrastructure implementations
		this.userRepository = new InMemoryUserRepository()
		this.authService = new JwtAuthService()
	}

	static getInstance(): DIContainer {
		if (!DIContainer.instance) {
			DIContainer.instance = new DIContainer()
		}
		return DIContainer.instance
	}

	getCreateUserUseCase() {
		const dependencies: CreateUserDependencies = {
			userRepository: this.userRepository,
			authService: this.authService,
		}
		return (data: any) => createUserUseCase(dependencies, data)
	}

	getSigninUserUseCase() {
		const dependencies: SigninUserDependencies = {
			userRepository: this.userRepository,
			authService: this.authService,
		}
		return (credentials: any) => signinUserUseCase(dependencies, credentials)
	}

	getUserRepository(): UserRepository {
		return this.userRepository
	}

	getAuthService(): AuthService {
		return this.authService
	}
}
