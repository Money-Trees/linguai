import { Lesson, PromptTemplate } from '@naite/types';

export const lessonPromptTemplate = {
  id: 'lesson-1.0',
  render: ({ language, topic, theme }: Lesson) => `
    Give me 15 ${language} sentences that contain ${topic} around the theme ${theme}.
    Surround the ${topic} with square brackets.
    Instead of having the ${topic} at the same position in every sentence, vary the position of the ${topic} for different sentences.

    ###
    This is an example output for sentences in the language german including possessive pronouns surrounded by square brackets around the theme travel:
    1. [Mein] Pass liegt sicher in der Tasche.
    2. Wir haben [unsere] Koffer verloren.
    3. Ich packe [meinen] Rucksack für diese Reise.
   `,
} satisfies PromptTemplate<Lesson>;
