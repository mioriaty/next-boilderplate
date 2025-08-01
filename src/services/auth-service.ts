import { AuthService } from '@/services/interfaces/auth-service';
import { supabase } from '@/shared/database/supabase';

export class DrizzleAuthService implements AuthService {
  async hashPassword(password: string): Promise<string> {
    // In a real app, you'd use bcrypt or similar
    // For now, we'll use a simple hash (NOT for production)
    return Buffer.from(password).toString('base64');
  }

  async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    const hashedInput = Buffer.from(password).toString('base64');
    return hashedInput === hashedPassword;
  }

  async signUp(email: string, password: string) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password
    });

    if (error) throw error;
    return data;
  }

  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) throw error;
    return data;
  }

  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  }

  async getCurrentUser() {
    const {
      data: { user },
      error
    } = await supabase.auth.getUser();
    if (error) throw error;
    return user;
  }
}
