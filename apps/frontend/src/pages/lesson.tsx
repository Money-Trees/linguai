import { ReactElement, useEffect, useState } from 'react';
import { Box, Card, VStack } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { useLesson } from '../services/lesson.service';
import ClozeTestTask from '../components/Task/ClozeTestTask';
import { Task } from '@naite/types';
import TaskDescription from '../components/Task/TaskDescription';

const Lesson = (): ReactElement => {
  const { id } = useParams();
  const { data: lesson } = useLesson(id, { select: 'tasks' });
  const [currentTask, setCurrentTask] = useState<Task>();
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

  return (
    <Card width="80%" p={8}>
      <VStack>
        <Box
          as="span"
          marginRight="auto"
          bg="gray.400"
          width="100%"
          height="20px"
          borderRadius="10px"
          borderWidth="2px"
          borderColor="gray.400"
          _before={{
            content: `""`,
            position: 'absolute',
            width: `${completePercentage}%`,
            height: '16px',
            bg: 'primary.500',
            borderRadius: '10px',
          }}
        />
        {lesson && currentTask && (
          <>
            <TaskDescription
              taskType={currentTask.type}
              lessonTopic={lesson?.topic}
            />
            <ClozeTestTask question={currentTask.question} />
            <Card
              backgroundColor="gray.300"
              _dark={{
                backgroundColor: 'gray.800',
              }}
            >
              Translation
            </Card>
          </>
        )}
      </VStack>
    </Card>
  );
};

export default Lesson;
