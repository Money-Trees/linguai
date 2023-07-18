import { Lesson, PromptTemplate } from '@naite/types';

export const lessonPromptTemplate = {
  id: 'lesson-1.0',
  render: ({ language, topic, theme }: Lesson) => `
    Give me 15 ${language} sentences that contain ${topic} around the theme ${theme}.
    Surround the ${topic} with square brackets.
    The position of the ${topic} should vary in the different sentences.
   `,
} satisfies PromptTemplate<Lesson>;
