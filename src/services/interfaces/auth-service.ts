export interface AuthService {
  hashPassword(password: string): Promise<string>;
  verifyPassword(password: string, hashedPassword: string): Promise<boolean>;
  signUp(email: string, password: string): Promise<any>;
  signIn(email: string, password: string): Promise<any>;
  signOut(): Promise<void>;
  getCurrentUser(): Promise<any>;
}
