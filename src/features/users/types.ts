export interface User {
  id: string;
  email: string;
  name: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface NewUser {
  email: string;
  name: string;
  password: string;
}

export interface CreateUserData {
  email: string;
  name: string;
  password: string;
}

export interface SignInData {
  email: string;
  password: string;
}

export interface UserStore {
  user: User | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  createUser: (data: CreateUserData) => Promise<void>;
  signIn: (data: SignInData) => Promise<void>;
  signOut: () => Promise<void>;
  clearError: () => void;
}
