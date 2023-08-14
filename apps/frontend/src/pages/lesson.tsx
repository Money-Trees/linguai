import { ReactElement, useCallback, useEffect, useState } from 'react';
import {
  Button,
  Card,
  VStack,
  Progress,
  Text,
  Spinner,
  CardHeader,
} from '@chakra-ui/react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useLesson } from '../services/lesson.service';
import { Task } from '@dialoq/types';
import TaskContainer from '../components/Task/TaskContainer';
import { BiChevronLeft } from 'react-icons/bi';

export interface LessonState {
  status: 'ongoing' | 'completed' | 'empty';
  currentTask?: Task;
}

const Lesson = (): ReactElement => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: lesson, isLoading } = useLesson(id, { select: 'tasks' });

  const [lessonState, setLessonState] = useState<LessonState>();

  const getNewTask = useCallback(
    (currentTask?: Task): Task | undefined => {
      if (!lesson?.tasks?.length) {
        return undefined;
      }

      if (!currentTask) {
        return lesson.tasks.find((task) => !task.isCompleted);
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

  if (lessonState.status === 'completed') {
    return (
      <Card width="80%" p={8}>
        <VStack>
          <Text>
            {/* eslint-disable-next-line jsx-a11y/accessible-emoji */}
            Lesson is completed <span role="img">✅</span>
          </Text>
          <Button onClick={() => navigate('/app')}>Back to home view</Button>
        </VStack>
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
    <Card width={['90%', '80%', '80%']} p={[6, 8, 8]}>
      <CardHeader px={0}>
        <Button px={0} variant="ghost" onClick={() => navigate('/app')}>
          <BiChevronLeft />
          {`Back to home`}
        </Button>
      </CardHeader>
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
          <TaskContainer
            task={lessonState.currentTask!}
            subtopic={lesson.subtopic}
          />
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
