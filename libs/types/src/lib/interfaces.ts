import { Role } from './enums';

export interface ResponseError {
  statusCode: number;
  error: string;
  message?: string[];
}

export interface Document {
  id: string;
  created_at: Date;
  updated_at: Date;
}

export interface User extends Document {
  email: string;
  firstname: string;
  lastname: string;
  role?: Role;
  image?: string;
}

export interface Auth {
  authenticated: boolean;
  userId?: string;
}
