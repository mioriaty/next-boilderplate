// src/entities/models/user.ts
export interface User {
	id: string
	name: string
	email: string
	password?: string
	createdAt: Date
	updatedAt: Date
}

export interface CreateUserData {
	name: string
	email: string
	password: string
}

export interface UserCredentials {
	email: string
	password: string
}
