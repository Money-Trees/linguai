import { LessonConfig, PromptTemplate } from '@naite/types';

export const lessonPromptTemplate = {
  id: 'lesson-1.0',
  render: ({ language, topic, verbForms }: LessonConfig) => `
    Provide a cloze test for the language:
    ###
    ${language}.
    ###
    The cloze test should be about the topic:
    ###
    ${topic}.
    ###
    The cloze test should include following verb forms:
    ###
    ${verbForms.reduce((verbForm) => `${verbForm}, `, '')}.
    ###
    Write the cloze test in a modern tone.
    Provide the solution for the cloze test seperated from the cloze test itself by a row of '#'
   `,
} satisfies PromptTemplate<LessonConfig>;
