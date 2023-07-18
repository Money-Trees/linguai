import { LessonConfig, PromptTemplate } from '@naite/types';

export const lessonPromptTemplate = {
  id: 'lesson-1.0',
  render: ({ language, topic, verbForms }: LessonConfig) => `
    Provide a cloze test for the language ${language}.
    The gaps should be filled with following word types:
    ${verbForms.reduce((verbForm) => `${verbForm}, `, '')}.
    The sentences should be around the topic ${topic}.
    The gaps of the cloze test should be represented by parentheses containing the number of the gap corresponding to the solution, for example like this for the first gap (1).
    Provide the solution for the spots in this format: number of spot : solution, for example: 1 : apple
    Write the cloze test in a modern tone.
    Mark the cloze test by writing "Cloze Test:" in the line before and mark the solution by writing "Solution:" in the line before.
   `,
} satisfies PromptTemplate<LessonConfig>;
