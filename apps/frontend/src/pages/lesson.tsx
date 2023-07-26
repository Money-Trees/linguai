import { ReactElement, useEffect, useState } from 'react';
import {
  Button,
  Card,
  VStack,
  Progress,
  Text,
  Spinner,
} from '@chakra-ui/react';
import { Link, useParams } from 'react-router-dom';
import { useLesson } from '../services/lesson.service';
import { Task } from '@naite/types';
import TaskContainer from '../components/Task/TaskContainer';

export type LessonState =
  | {
      status: 'ongoing';
      currentTask: Task | undefined;
      completionPercentage: number;
    }
  | {
      status: 'completed';
      currentTask: undefined;
      completionPercentage: 100;
    }
  | {
      status: 'empty';
      currentTask: undefined;
      completionPercentage: 100;
    };

const Lesson = (): ReactElement => {
  const { id } = useParams();
  const { data: lesson, isLoading } = useLesson(id, { select: 'tasks' });

  const [lessonState, setLessonState] = useState<LessonState>();

  const getNewTask = (tasks: Task[], currentTask?: Task): Task | undefined => {
    const taskIndex = currentTask
      ? tasks.findIndex((task) => currentTask.id === task.id)
      : 0;

    const newTaskInNextTasks = tasks.find(
      (task, index) => !task.isCompleted && taskIndex < index
    );
    const newTasksInPreviousTasks = tasks.find(
      (task, index) => !task.isCompleted && taskIndex > index
    );

    return newTaskInNextTasks || newTasksInPreviousTasks;
  };

  const getCompletionPercentage = (tasks: Task[]): number => {
    const completedCount = tasks.reduce(
      (prev, task) => (task.isCompleted ? prev + 1 : prev),
      0
    );

    return (completedCount / tasks.length) * 100;
  };

  useEffect(() => {
    if (!lesson || !lesson.tasks) {
      return;
    } else if (!lesson?.tasks.length) {
      setLessonState({
        status: 'empty',
        currentTask: undefined,
        completionPercentage: 100,
      });
    }

    const isCompleted = lesson.tasks.every((task) => task.isCompleted);
    const newLessonState: LessonState = isCompleted
      ? {
          status: 'completed',
          currentTask: undefined,
          completionPercentage: 100,
        }
      : {
          status: 'ongoing',
          currentTask: getNewTask(lesson.tasks, lessonState?.currentTask),
          completionPercentage: getCompletionPercentage(lesson.tasks),
        };

    setLessonState(newLessonState);
  }, [lesson, lessonState?.currentTask]);

  if (
    !lesson ||
    !lessonState ||
    (lessonState.status === 'ongoing' && !lessonState.currentTask)
  ) {
    return (
      <Card width="80%" p={8}>
        {isLoading ? <Spinner /> : 'Lesson not found :/'}
      </Card>
    );
  }

  return (
    <Card width="80%" p={8}>
      <Progress
        borderRadius={'md'}
        value={lessonState?.completionPercentage}
        isAnimated={true}
        sx={{
          '& > div:first-child': {
            transitionProperty: 'width',
          },
        }}
      />
      <VStack marginTop="32px">
        {lessonState.status === 'ongoing' && (
          <TaskContainer task={lessonState.currentTask!} topic={lesson.topic} />
        )}
        {lessonState.status === 'empty' && (
          <VStack spacing={4} width="100%" alignItems="center">
            <Card
              display="flex"
              flex={1}
              p={4}
              bg="green.500"
              height="70px"
              justifyContent="center"
              alignItems="center"
              borderRadius="md"
            >
              <Text as="b" fontSize="xl" color="white">
                Congratulations! You have completed the lesson!
              </Text>
            </Card>
            <Link to="/">
              <Button height="70px" width="200px" colorScheme="green">
                Return to Home
              </Button>
            </Link>
          </VStack>
        )}
      </VStack>
    </Card>
  );
};

export default Lesson;
