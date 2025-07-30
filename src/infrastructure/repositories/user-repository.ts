// src/infrastructure/repositories/user-repository.ts
import { UserRepository } from '@/application/interfaces/user-repository'
import { User, CreateUserData } from '@/entities/models/user'
import { NotFoundError } from '@/entities/errors/app-error'

export class InMemoryUserRepository implements UserRepository {
	private users: User[] = []

	async create(data: CreateUserData): Promise<User> {
		const user: User = {
			id: this.generateId(),
			name: data.name,
			email: data.email,
			password: data.password,
			createdAt: new Date(),
			updatedAt: new Date(),
		}

		this.users.push(user)
		return user
	}

	async findById(id: string): Promise<User | null> {
		return this.users.find(user => user.id === id) || null
	}

	async findByEmail(email: string): Promise<User | null> {
		return this.users.find(user => user.email === email) || null
	}

	async update(id: string, data: Partial<User>): Promise<User> {
		const userIndex = this.users.findIndex(user => user.id === id)
		if (userIndex === -1) {
			throw new NotFoundError('User')
		}

		this.users[userIndex] = {
			...this.users[userIndex],
			...data,
			updatedAt: new Date(),
		}

		return this.users[userIndex]
	}

	async delete(id: string): Promise<void> {
		const userIndex = this.users.findIndex(user => user.id === id)
		if (userIndex === -1) {
			throw new NotFoundError('User')
		}

		this.users.splice(userIndex, 1)
	}

	private generateId(): string {
		return Math.random().toString(36).substr(2, 9)
	}
}
