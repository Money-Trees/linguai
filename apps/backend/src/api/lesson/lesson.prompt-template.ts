import { Lesson, PromptTemplate, Subtopic } from '@naite/types';

const precedeWithPersonAndNumber = (subtopic: Subtopic): string =>
  `
    Each ${subtopic} in square brackets should be followed by the person and number (singular of plural) of ${subtopic} in curly brackets which should not be included in the translation.
    Example: [Mein] {1st person singular} Pass liegt sicher in [meiner] {1st person singular} Tasche.
  `;

const topicSpecificPrompt: {
  [key in Subtopic]: (subtopic: Subtopic) => string;
} = {
  articles: () => '',
  possessivePronouns: precedeWithPersonAndNumber,
  presentTense: precedeWithPersonAndNumber,
  compositePastTense: precedeWithPersonAndNumber,
};

export const lessonPromptTemplate = {
  id: 'lesson-1.0',
  render: ({ language, subtopic, theme }: Lesson) => `
    Give me 15 ${language} sentences that contain multiple ${subtopic} around the theme ${theme}.
    Surround the ${subtopic} with square brackets and provide a translation for the sentences.
    Instead of having the ${subtopic} at the same position in every sentence, vary the position of the ${subtopic} for different sentences.

    ###
    This is an example output for sentences in the language german including possessive pronouns surrounded by square brackets around the theme travel:
    1. [Mein] Pass liegt sicher in [meiner] Tasche- - [My] passport is safe in [my] bag.
    2. Wir haben [unsere] Koffer verloren. - We lost [our] luggage.
    3. Ich packe [meinen] Rucksack für diese Reise. - I pack [my] backpack for this trip.
    ###

    Additional Information:
    ${topicSpecificPrompt[subtopic](subtopic)}
   `,
} satisfies PromptTemplate<Lesson>;
