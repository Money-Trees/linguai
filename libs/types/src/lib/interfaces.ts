import { Language, Role, TaskType } from './enums';
import { Subtopic } from './types';

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
  subtopic: Subtopic;
  tasks?: Task[];
}

export interface LessonPromptParams extends Lesson {
  taskCount: number;
}

export interface Task extends Document {
  question: string;
  answer: string;
  isCompleted?: boolean;
  type: TaskType;
  lessonId: string;
  translation: string;
  options?: string;
  lesson?: Lesson;
}
