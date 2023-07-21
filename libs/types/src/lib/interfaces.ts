import { Language, Role, TaskType } from './enums';
import { Topic } from './types';

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

export interface Auth {
  authenticated: boolean;
  userId?: string;
}

export interface User extends Document {
  email: string;
  firstname: string;
  lastname: string;
  role?: Role;
  image?: string;
}

export interface Lesson extends Document {
  name: string;
  userId: string;
  language: Language;
  theme: string;
  topic: Topic;
  tasks?: Task[];
}

export interface Task extends Document {
  question: string;
  modelAnswer: string;
  isCompleted?: boolean;
  type: TaskType;
  lessonId: string;
  lesson?: Lesson;
}
