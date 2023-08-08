import { LessonConfigType, Subtopic, TaskType } from '@naite/types';

const LessonConfig: Pick<LessonConfigType, 'default'> = {
  default: {
    [TaskType.Cloze]: 5,
    [TaskType.Select]: 5,
    [TaskType.Arrange]: 5,
  },
  ['articles' as Subtopic]: {
    [TaskType.Cloze]: 5,
    [TaskType.Select]: 5,
    [TaskType.Arrange]: 5,
  },
  ['possessivePronouns' as Subtopic]: {
    [TaskType.Cloze]: 5,
    [TaskType.Select]: 5,
    [TaskType.Arrange]: 5,
  },
  ['presentTense' as Subtopic]: {
    [TaskType.Cloze]: 5,
    [TaskType.Select]: 5,
    [TaskType.Arrange]: 5,
  },
  ['compositePastTense' as Subtopic]: {
    [TaskType.Cloze]: 5,
    [TaskType.Select]: 5,
    [TaskType.Arrange]: 5,
  },
};

export default LessonConfig;
