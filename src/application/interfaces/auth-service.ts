// src/application/interfaces/auth-service.ts
import { User } from '@/entities/models/user';

export interface AuthService {
	hashPassword(password: string): Promise<string>
	comparePassword(password: string, hashedPassword: string): Promise<boolean>
	generateToken(user: User): Promise<string>
	verifyToken(token: string): Promise<User>
}
