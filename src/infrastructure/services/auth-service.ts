// src/infrastructure/services/auth-service.ts
import { AuthService } from '@/application/interfaces/auth-service';
import { User } from '@/entities/models/user';
import { UnauthorizedError } from '@/entities/errors/app-error';

export class JwtAuthService implements AuthService {
	async hashPassword(password: string): Promise<string> {
		// In a real implementation, you would use bcrypt or similar
		// For demo purposes, we'll just return a simple hash
		return `hashed_${password}_${Date.now()}`;
	}

	async comparePassword(
		password: string,
		hashedPassword: string
	): Promise<boolean> {
		// In a real implementation, you would use bcrypt.compare
		// For demo purposes, we'll do a simple comparison
		const expectedHash = `hashed_${password}_${Date.now()}`;
		return (
			hashedPassword.startsWith('hashed_') && hashedPassword.includes(password)
		);
	}

	async generateToken(user: User): Promise<string> {
		// In a real implementation, you would use JWT
		// For demo purposes, we'll create a simple token
		const payload = {
			userId: user.id,
			email: user.email,
			iat: Date.now()
		};

		return Buffer.from(JSON.stringify(payload)).toString('base64');
	}

	async verifyToken(token: string): Promise<User> {
		try {
			// In a real implementation, you would verify JWT
			// For demo purposes, we'll decode the simple token
			const payload = JSON.parse(Buffer.from(token, 'base64').toString());

			// In a real app, you would fetch the user from database
			// For demo purposes, we'll return a mock user
			const user: User = {
				id: payload.userId,
				email: payload.email,
				name: 'Mock User',
				createdAt: new Date(),
				updatedAt: new Date()
			};

			return user;
		} catch (error) {
			throw new UnauthorizedError('Invalid token');
		}
	}
}
