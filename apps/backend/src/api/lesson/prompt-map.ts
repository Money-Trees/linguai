import { Lesson, PromptTemplate, TaskType } from '@naite/types';
import { clozePrompt } from './cloze.prompt';
import { selectPrompt } from './select.prompt';
import { arrangePrompt } from './arrange.prompt';

export const promptMap: { [key in TaskType]: PromptTemplate<Lesson> } = {
  [TaskType.Cloze]: clozePrompt,
  [TaskType.Select]: selectPrompt,
  [TaskType.Arrange]: arrangePrompt,
};
