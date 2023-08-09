import {
  Lesson,
  LessonPromptParams,
  PromptTemplate,
  Subtopic,
  TaskType,
} from '@naite/types';

interface PromptOutputEntry {
  sentence: string;
  answer: string;
  translation: string;
}

const precedeWithPersonNumberGender = (subtopic: Subtopic): string =>
  `
    Each ${subtopic} in square brackets should be followed by the person and number (singular of plural) of ${subtopic} in curly brackets which should not be included in the translation.
    The curly brackets should also contain the gender of the ${subtopic} if needed.
    Example: [Mein] {1st person singular} Pass liegt sicher in [ihrer] {3rd person singular feminine} Tasche.
  `;

const topicSpecificPrompt: {
  [key in Subtopic]: (subtopic: Subtopic) => string;
} = {
  articles: () => '',
  possessivePronouns: precedeWithPersonNumberGender,
  presentTense: precedeWithPersonNumberGender,
  compositePastTense: precedeWithPersonNumberGender,
};

export const clozePrompt = {
  id: 'cloze-test',
  render: ({ language, subtopic, theme, taskCount }: LessonPromptParams) => `
    Give me ${taskCount} ${language} sentences that contain multiple ${subtopic} around the theme ${theme}.
    Surround the ${subtopic} with square brackets and provide a translation for the sentences.
    Instead of having the ${subtopic} at the same position in every sentence, vary the position of the ${subtopic} for different sentences.

    ###
    This is an example output for sentences in the language german including possessive pronouns surrounded by square brackets around the theme travel:
    1. [Mein] Pass liegt sicher in [meiner] Tasche. - [My] passport is safe in [my] bag.
    2. Wir haben [unsere] Koffer verloren. - We lost [our] luggage.
    3. Ich packe [meinen] Rucksack für diese Reise. - I pack [my] backpack for this trip.
    ###

    The output should be in JSON
    Use following object model for JSON:
    {
      data: [
        {
          sentence: string,
          translation: string,
          answer: string
          /* content of all square brackets (without the brackets) in correct order and separated by comma. Example: sentence -> "[Mein] Computer steht auf ihren Tisch" answer -> Mein,ihren */
        }
        ...
      ]
    }

    Additional Information:
    ${topicSpecificPrompt[subtopic](subtopic)}
   `,
  parse: (promptOutput: string, lessonId: string) => {
    const parsedOutput: PromptOutputEntry[] =
      JSON.parse(promptOutput).data || [];

    return parsedOutput.map((item) => ({
      lessonId,
      type: TaskType.Cloze,
      question: item.sentence,
      answer: item.answer,
      translation: item.translation,
    }));
  },
} satisfies PromptTemplate<Lesson>;
