import {
  Lesson,
  LessonPromptParams,
  PromptTemplate,
  TaskType,
} from '@naite/types';

interface PromptOutputEntry {
  sentence: string;
  translation: string;
}
export const arrangePrompt = {
  id: 'arrange-sentence',
  render: ({ language, taskCount, theme, subtopic }: LessonPromptParams) =>
    `
      Give me ${taskCount} short ${language} sentences around the theme ${theme}.
      The sentences should also contain ${subtopic}.
      Do not include the dot at the end of the sentence.
      Every sentence should be provided with a translation.

      The output should be a JSON
      Example Output with sentences that contain possessive pronouns:
      data: [
          {
             "sentence": "Mein Flugzeug startet morgen früh",
             "translation": "My airplane takes off tomorrow morning"
          }
          ...
      ]
  `,
  parse: (promptOutput: string, lessonId: string) => {
    const parsedOutput: PromptOutputEntry[] =
      JSON.parse(promptOutput).data || [];

    return parsedOutput.map((item) => ({
      lessonId,
      type: TaskType.Arrange,
      question: item.sentence,
      answer: item.sentence,
      translation: item.translation,
    }));
  },
} satisfies PromptTemplate<Lesson>;
