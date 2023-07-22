import { ReactElement, useEffect, useState } from 'react';
import { Button, Card, HStack, VStack, Text, Progress } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { useLesson } from '../services/lesson.service';
import ClozeTestTask from '../components/Task/ClozeTestTask';
import { Task } from '@naite/types';
import TaskDescription from '../components/Task/TaskDescription';
import { useUpdateTask } from '../services/task.service';

const Lesson = (): ReactElement => {
  const { id } = useParams();
  const { data: lesson } = useLesson(id, { select: 'tasks' });
  const [currentTask, setCurrentTask] = useState<Task>();
  const { mutate: updateTask } = useUpdateTask(currentTask?.id);
  const [answer, setAnswer] = useState('');

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

    if (answer === currentTask.modelAnswers && !currentTask.isCompleted) {
      updateTask({ ...currentTask, isCompleted: true });
    } else if (answer !== currentTask.modelAnswers && currentTask.isCompleted) {
      updateTask({ ...currentTask, isCompleted: false });
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
            <HStack width="100%" justifyContent="flex-end">
              <Button isDisabled={!answer} onClick={() => answerTask()}>
                Check answer
              </Button>
            </HStack>
          </>
        )}
      </VStack>
    </Card>
  );
};

export default Lesson;
