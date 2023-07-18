import { FrenchTopic, GermanTopic, Role, TaskType } from './enums';

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
  theme: string;
  topic: GermanTopic | FrenchTopic;
}

export interface Task extends Document {
  question: string;
  answer: string;
  type: TaskType;
  lessonId: string;
}

export interface LessonConfig {
  language: string;
  topic: string;
  verbForms: string[];
}
