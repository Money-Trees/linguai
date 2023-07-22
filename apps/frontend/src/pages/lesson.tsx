import { ReactElement, useEffect, useState } from 'react';
import { Button, Card, HStack, VStack, Progress } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
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
