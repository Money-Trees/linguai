import { ReactElement, useEffect, useState } from 'react';
import { Button, Card, HStack, VStack, Text } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { useLesson } from '../services/lesson.service';
import ClozeTestTask from '../components/Task/ClozeTestTask';
import TaskDescription from '../components/Task/TaskDescription';
import { useUpdateTask } from '../services/task.service';
import ProgressBar from '../components/ProgressBar';
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

  return (
    <Card width="80%" p={8}>
      <ProgressBar completed={completePercentage} />
      <VStack marginTop="32px">
        {lesson && currentTask && (
          <>
            <TaskDescription
              taskType={currentTask.type}
              lessonTopic={lesson?.topic}
            />
            <ClozeTestTask
              question={currentTask.question}
              onInputValuesChange={handleInputValuesChange}
            />
            <Card
              padding="4"
              backgroundColor="gray.300"
              _dark={{
                backgroundColor: 'gray.800',
              }}
              width="100%"
            >
              <HStack>
                <Text as="b">Translation:</Text>
                <Text> {currentTask.translation}</Text>
              </HStack>
            </Card>
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
                <Button height="70px">Continue</Button>
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
                <Button height="70px">Continue</Button>
              </HStack>
            )}
          </>
        )}
      </VStack>
    </Card>
  );
};

export default Lesson;
