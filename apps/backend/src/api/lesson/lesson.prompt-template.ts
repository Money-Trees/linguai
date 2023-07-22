import { Lesson, PromptTemplate } from '@naite/types';

export const lessonPromptTemplate = {
  id: 'lesson-1.0',
  render: ({ language, topic, theme }: Lesson) => `
    Give me 15 ${language} sentences that contain multiple ${topic} around the theme ${theme}.
    Surround the ${topic} with square brackets and provide a translation for the sentences.
    Instead of having the ${topic} at the same position in every sentence, vary the position of the ${topic} for different sentences.

    ###
    This is an example output for sentences in the language german including possessive pronouns surrounded by square brackets around the theme travel:
    1. [Mein] Pass liegt sicher in [meiner] Tasche- - [My] passport is safe in [my] bag.
    2. Wir haben [unsere] Koffer verloren. - We lost [our] luggage.
    3. Ich packe [meinen] Rucksack für diese Reise. - I pack [my] backpack for this trip.
    ###
   `,
} satisfies PromptTemplate<Lesson>;
