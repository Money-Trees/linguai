import { Lesson } from '@naite/types';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Text,
} from '@chakra-ui/react';
import { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';

const LessonCard = ({ lesson }: { lesson: Lesson }): ReactElement => {
  const navigate = useNavigate();

  return (
    <Card
      backgroundColor="gray.300"
      _dark={{
        backgroundColor: 'gray.800',
      }}
    >
      <CardHeader>
        <Heading size="md">{lesson.name}</Heading>
      </CardHeader>
      <CardBody>
        <Text>Theme: </Text>
        <Text as="b">{lesson.theme}</Text>
        <Text>Grammar concept: </Text>
        <Text as="b">{lesson.topic}</Text>
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
