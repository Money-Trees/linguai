import { Profile } from 'passport-google-oauth20';
import { FrenchTopic, GermanTopic } from './enums';

export type GoogleUser = Profile['_json'] & {
  accessToken: string;
  refreshToken: string;
};

export type RequestBody<T> = Omit<T, 'id' | 'created_at' | 'updated_at'>;

export type PromptTemplate<T> = {
  id: string;
  render: (params: T) => string;
};

export class Prompt<T> {
  public constructor(public template: PromptTemplate<T>, public params: T) {}
  public render(): string {
    return this.template.render(this.params);
  }
}

export type Subtopic = GermanTopic | FrenchTopic;
