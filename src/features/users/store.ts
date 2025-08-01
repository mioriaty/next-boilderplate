import { createUserUseCaseFactory, signInUserUseCaseFactory } from '@/shared/factories/use-case-factory';
import { create } from 'zustand';

import { CreateUserData, SignInData, UserStore } from './types';

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  isLoading: false,
  error: null,

  // Create user
  createUser: async (data: CreateUserData) => {
    try {
      set({ isLoading: true, error: null });
      const createUser = createUserUseCaseFactory();
      const result = await createUser(data);
      set({ user: result.user, isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to create user',
        isLoading: false
      });
    }
  },

  // Sign in
  signIn: async (data: SignInData) => {
    try {
      set({ isLoading: true, error: null });
      const signIn = signInUserUseCaseFactory();
      const result = await signIn(data);
      set({ user: result.user, isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to sign in',
        isLoading: false
      });
    }
  },

  // Sign out
  signOut: async () => {
    try {
      set({ isLoading: true, error: null });
      // TODO: Implement sign out logic
      set({ user: null, isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to sign out',
        isLoading: false
      });
    }
  },

  // Clear error
  clearError: () => {
    set({ error: null });
  }
}));
