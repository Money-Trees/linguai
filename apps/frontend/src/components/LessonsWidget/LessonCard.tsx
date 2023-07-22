import { Lesson } from '@naite/types';
import {
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Text,
  VStack,
} from '@chakra-ui/react';
import { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import ProgressBar from '../ProgressBar';

const LessonCard = ({ lesson }: { lesson: Lesson }): ReactElement => {
  const navigate = useNavigate();

  const getCompletedPercentage = (): number => {
    if (!lesson.tasks) {
      return 0;
    }

    const completedCount = lesson.tasks.reduce(
      (prev, task) => (task.isCompleted ? prev + 1 : prev),
      0
    );

    return (completedCount / lesson.tasks.length) * 100;
  };

  return (
    <Card
      backgroundColor="gray.300"
      _dark={{
        backgroundColor: 'gray.800',
      }}
    >
      <CardHeader>
        <Heading title={lesson.name} size="md" noOfLines={1} maxWidth="full">
          {lesson.name}
        </Heading>
      </CardHeader>
      <CardBody>
        <VStack alignItems="flex-start" gap={4}>
          <ProgressBar completed={getCompletedPercentage()} />
          <Box>
            <Text>Theme: </Text>
            <Badge>{lesson.theme}</Badge>
          </Box>
          <Box>
            <Text>Grammar concept: </Text>
            <Badge>{lesson.topic}</Badge>
          </Box>
        </VStack>
      </CardBody>
      <CardFooter>
        <Button onClick={() => navigate(`/lesson/${lesson.id}`)}>
          Go to Lesson
        </Button>
      </CardFooter>
    </Card>
  );
};

export default LessonCard;
