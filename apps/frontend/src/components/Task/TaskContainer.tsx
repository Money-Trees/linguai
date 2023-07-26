import React, { useState } from 'react';
import TaskDescription from './TaskDescription';
import ClozeTestTask from './ClozeTestTask';
import TaskQuestionTranslation from './TaskQuestionTranslation';
import { Button, Card, HStack, Text } from '@chakra-ui/react';
import { Task, Topic } from '@naite/types';
import { useUpdateTask } from '../../services/task.service';

interface TaskProps {
  task: Task;
  topic: Topic;
}

export type TaskState =
  | { type: 'CORRECT'; answer: string }
  | { type: 'UNANSWERED'; answer: string }
  | { type: 'INCORRECT'; answer: string };

const initialTaskState: TaskState = { type: 'UNANSWERED', answer: '' };

const TaskContainer = ({ task, topic }: TaskProps): React.JSX.Element => {
  const [taskState, setTaskState] = useState<TaskState>(initialTaskState);
  const { mutate: updateTask } = useUpdateTask(task.id);

  const handleInputValuesChange = (inputValues: string[]): void => {
    console.log(inputValues);
    setTaskState({
      type: 'UNANSWERED',
      answer: inputValues.filter((value) => !!value.trim()).join(', '),
    });
  };

  const answerTask = (): void => {
    if (!task) {
      return;
    }

    if (taskState.answer === task.modelAnswers) {
      updateTask({ ...task, isCompleted: true });
      setTaskState((prevState) => ({
        type: 'CORRECT',
        answer: prevState.answer,
      }));
    } else if (taskState.answer !== task.modelAnswers) {
      // TODO why else if? what other cases are there
      updateTask({ ...task, isCompleted: false });
      setTaskState((prevState) => ({
        type: 'CORRECT',
        answer: prevState.answer,
      }));
    }
  };

  const handleContinue = (): void => {
    updateTask({ ...task, isCompleted: taskState.type === 'CORRECT' });
  };

  return (
    <>
      <TaskDescription taskType={task.type} lessonTopic={topic} />
      <ClozeTestTask
        question={task.question}
        onInputValuesChange={handleInputValuesChange}
      />
      <TaskQuestionTranslation translation={task.translation} />
      {taskState.type === 'UNANSWERED' && (
        <HStack width="100%" justifyContent="flex-end">
          <Button isDisabled={!taskState.answer} onClick={() => answerTask()}>
            Check answer
          </Button>
        </HStack>
      )}
      {taskState.type === 'CORRECT' && (
        <HStack width="100%" justifyContent="space-between">
          <Card
            display="flex"
            flex={1}
            p={4}
            bg="primary.600"
            height="70px"
            justifyContent="center"
            alignItems="center"
          >
            <Text as="b">Correct answer</Text>
          </Card>
          <Button height="70px" onClick={() => handleContinue()}>
            Continue
          </Button>
        </HStack>
      )}
      {taskState.type === 'INCORRECT' && (
        <HStack width="100%" justifyContent="space-between">
          <Card
            display="flex"
            flex={1}
            p={4}
            bg="red.300"
            height="70px"
            justifyContent="center"
            alignItems="center"
          >
            <Text as="b" _dark={{ color: 'black' }}>
              Wrong answer
            </Text>
          </Card>
          <Button height="70px" onClick={() => handleContinue()}>
            Continue
          </Button>
        </HStack>
      )}
    </>
  );
};

export default TaskContainer;
