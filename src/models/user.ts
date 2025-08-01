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
