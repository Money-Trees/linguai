import { ReactElement, useCallback, useEffect, useState } from 'react';
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

export interface LessonState {
  status: 'ongoing' | 'completed' | 'empty';
  currentTask?: Task;
}

const Lesson = (): ReactElement => {
  const { id } = useParams();
  const { data: lesson, isLoading } = useLesson(id, { select: 'tasks' });

  const [lessonState, setLessonState] = useState<LessonState>();

  const getNewTask = useCallback(
    (currentTask?: Task): Task | undefined => {
      if (!lesson?.tasks?.length) {
        return undefined;
      }

      if (!currentTask) {
        return lesson.tasks[0];
      }

      const taskIndex = lesson.tasks.findIndex(
        (task) => currentTask.id === task.id
      );

      const newTaskInNextTasks = lesson.tasks.find(
        (task, index) => !task.isCompleted && taskIndex < index
      );
      const newTasksInPreviousTasks = lesson.tasks.find(
        (task, index) => !task.isCompleted && taskIndex > index
      );

      return newTaskInNextTasks || newTasksInPreviousTasks;
    },
    [lesson]
  );

  const getCompletionPercentage = (tasks: Task[]): number => {
    const completedCount = tasks.reduce(
      (prev, task) => (task.isCompleted ? prev + 1 : prev),
      0
    );

    return (completedCount / tasks.length) * 100;
  };

  useEffect(() => {
    if (!lesson?.tasks) {
      return;
    }

    setLessonState({
      status: lesson.tasks.length
        ? lesson.tasks.every((task) => task.isCompleted)
          ? 'completed'
          : 'ongoing'
        : 'empty',
      currentTask: getNewTask(),
    });
  }, [getNewTask, lesson]);

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

  if (!lesson.tasks?.length) {
    return (
      <Card width="80%" p={8}>
        <Text>This lesson has no tasks.</Text>
      </Card>
    );
  }

  return (
    <Card width="80%" p={8}>
      <Progress
        borderRadius={'md'}
        value={getCompletionPercentage(lesson.tasks)}
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
