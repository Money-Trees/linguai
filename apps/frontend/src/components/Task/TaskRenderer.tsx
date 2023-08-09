import React, { ReactElement } from 'react';
import ClozeTestTask from './ClozeTestTask';
import { Task, TaskType } from '@naite/types';
import SelectTask from './SelectTask';
import ArrangeTask from './ArrangeTask';

const TaskRenderer = ({
  task,
  onChange,
}: {
  task: Task;
  onChange: (input: string) => void;
}): ReactElement => {
  switch (task.type) {
    case TaskType.Cloze:
      return (
        <ClozeTestTask
          question={task.question}
          translation={task.translation}
          onInputValuesChange={onChange}
        />
      );
    case TaskType.Select:
      return (
        <SelectTask
          onInputValuesChange={onChange}
          question={task.question}
          options={task.options || ''}
        />
      );
    case TaskType.Arrange:
      return (
        <ArrangeTask
          onInputValuesChange={onChange}
          question={task.question}
          translation={task.translation}
        />
      );
  }
};

export default TaskRenderer;
