import {
  Lesson,
  LessonPromptParams,
  PromptTemplate,
  TaskType,
} from '@naite/types';

interface PromptOutputEntry {
  vocabulary: string;
  options: string;
  correctAnswer: string;
}

export const selectPrompt = {
  id: 'select-test',
  render: ({ language, taskCount, theme }: LessonPromptParams) => `
    Give me ${taskCount} questions regarding ${language} vocabulary where I have to choose the correct translation among 4 options.
    The vocabulary should be around the theme ${theme}.

    The output should be in JSO and have this structure:
    {
      data: [
        {
          vocabulary: string,
          options: string // translation options separated by comma without whitespace like this: "option1,option2,option3"
          correctAnswer: string
        }
      ]
    }
  `,
  parse: (promptOutputString: string, lessonId: string) => {
    const parsedOutput: PromptOutputEntry[] =
      JSON.parse(promptOutputString).data || [];

    return parsedOutput.map((entry) => ({
      lessonId,
      type: TaskType.Select,
      question: entry.vocabulary,
      answer: entry.correctAnswer,
      options: entry.options,
      translation: '',
    }));
  },
} satisfies PromptTemplate<Lesson>;
