import { Profile } from 'passport-google-oauth20';

export type GoogleUser = Profile['_json'] & {
  accessToken: string;
  refreshToken: string;
};

export type RequestBody<T> = Omit<T, 'id' | 'created_at' | 'updated_at'>;

export type PromptTemplate<T> = {
  id: string;
  render: (params: T) => string;
};
