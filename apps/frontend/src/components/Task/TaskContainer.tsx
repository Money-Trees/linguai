import React, { useCallback, useEffect, useState } from 'react';
import TaskDescription from './TaskDescription';
import { Button, Card, HStack, Text } from '@chakra-ui/react';
import { Task, Subtopic } from '@naite/types';
import { useUpdateTask } from '../../services/task.service';
import TaskRenderer from './TaskRenderer';

interface TaskProps {
  task: Task;
  subtopic: Subtopic;
}

export type TaskState =
  | { type: 'CORRECT'; answer: string }
  | { type: 'UNANSWERED'; answer: string }
  | { type: 'INCORRECT'; answer: string };

const initialTaskState: TaskState = { type: 'UNANSWERED', answer: '' };

const TaskContainer = ({ task, subtopic }: TaskProps): React.JSX.Element => {
  const [taskState, setTaskState] = useState<TaskState>(initialTaskState);
  const { mutate: updateTask } = useUpdateTask(task.id);

  useEffect(() => {
    setTaskState({
      type: 'UNANSWERED',
      answer: '',
    });
  }, [task]);

  const handleInputValuesChange = useCallback((input: string): void => {
    setTaskState({
      type: 'UNANSWERED',
      answer: input,
    });
  }, []);

  const answerTask = (): void => {
    if (!task) {
      return;
    }

    if (taskState.answer === task.answer) {
      setTaskState((prevState) => ({
        type: 'CORRECT',
        answer: prevState.answer,
      }));
    } else {
      setTaskState((prevState) => ({
        type: 'INCORRECT',
        answer: prevState.answer,
      }));
    }
  };

  const handleContinue = (): void => {
    updateTask({ ...task, isCompleted: taskState.type === 'CORRECT' });
  };

  return (
    <>
      {task.answer}
      <TaskDescription taskType={task.type} lessonSubtopic={subtopic} />
      <TaskRenderer task={task} onChange={handleInputValuesChange} />
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
