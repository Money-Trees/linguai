import { ReactElement, useEffect, useState } from 'react';
import { Button, Card, HStack, VStack, Progress, Text } from '@chakra-ui/react';
import { Link, useParams } from 'react-router-dom';
import { useLesson } from '../services/lesson.service';
import ClozeTestTask from '../components/Task/ClozeTestTask';
import TaskDescription from '../components/Task/TaskDescription';
import { useUpdateTask } from '../services/task.service';
import TaskQuestionTranslation from '../components/Task/TaskQuestionTranslation';
import { Task } from '@naite/types';

type TaskStatus = 'correct' | 'incorrect' | 'unanswered';

const Lesson = (): ReactElement => {
  const { id } = useParams();
  const { data: lesson } = useLesson(id, { select: 'tasks' });
  const [currentTask, setCurrentTask] = useState<Task>();
  const { mutate: updateTask } = useUpdateTask(currentTask?.id);
  const [answer, setAnswer] = useState('');
  const [taskStatus, setTaskStatus] = useState<TaskStatus>('unanswered');
  const [completePercentage, setCompletePercentage] = useState<number>(0);
  const [allAnswered, setAllAnswered] = useState<boolean>(false);

  useEffect(() => {
    if (lesson?.tasks?.length) {
      setCurrentTask(lesson.tasks.find((task) => !task.isCompleted));
    }
  }, [lesson]);

  useEffect(() => {
    if (lesson?.tasks?.length) {
      const completedCount = lesson.tasks.reduce(
        (prev, task) => (task.isCompleted ? prev + 1 : prev),
        0
      );

      const percentage = (completedCount / lesson.tasks.length) * 100;
      setCompletePercentage(percentage);
    }
  }, [currentTask, lesson?.tasks]);

  const handleInputValuesChange = (inputValues: string[]): void => {
    setAnswer(inputValues.filter((value) => !!value.trim()).join(', '));
  };

  const answerTask = (): void => {
    if (!currentTask) {
      return;
    }

    if (answer === currentTask.modelAnswers) {
      updateTask({ ...currentTask, isCompleted: true });
      setTaskStatus('correct');
    } else if (answer !== currentTask.modelAnswers) {
      updateTask({ ...currentTask, isCompleted: false });
      setTaskStatus('incorrect');
    }
  };

  const goToNextTask = (): void => {
    if (!lesson?.tasks || taskStatus === 'unanswered') {
      return;
    }

    const currentIndex = lesson.tasks.findIndex(
      (task) => task.id === currentTask?.id
    );

    const nextIncompleteTask = lesson.tasks
      .slice(currentIndex + 1)
      .find((task) => task.isCompleted === null);

    if (nextIncompleteTask) {
      setAnswer('');
      setTaskStatus('unanswered');
      setCurrentTask(nextIncompleteTask);
    } else {
      setAllAnswered(true);
    }
  };

  return (
    <Card width="80%" p={8}>
      <Progress
        borderRadius={'md'}
        value={completePercentage}
        isAnimated={true}
        sx={{
          '& > div:first-child': {
            transitionProperty: 'width',
          },
        }}
      />
      <VStack marginTop="32px">
        {lesson && currentTask && !allAnswered && (
          <>
            <TaskDescription
              taskType={currentTask.type}
              lessonTopic={lesson?.topic}
            />
            <ClozeTestTask
              question={currentTask.question}
              onInputValuesChange={handleInputValuesChange}
            />
            <TaskQuestionTranslation translation={currentTask.translation} />
            {taskStatus === 'unanswered' && (
              <HStack width="100%" justifyContent="flex-end">
                <Button isDisabled={!answer} onClick={() => answerTask()}>
                  Check answer
                </Button>
              </HStack>
            )}
            {taskStatus === 'correct' && (
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
                <Button height="70px" onClick={() => goToNextTask()}>
                  Continue
                </Button>
              </HStack>
            )}
            {taskStatus === 'incorrect' && (
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
                <Button height="70px" onClick={() => goToNextTask()}>
                  Continue
                </Button>
              </HStack>
            )}
          </>
        )}
        {allAnswered && (
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
