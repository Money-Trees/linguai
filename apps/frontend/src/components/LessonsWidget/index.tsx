import { ReactElement } from 'react';
import { VStack, Text, Grid } from '@chakra-ui/react';
import LessonCard from './LessonCard';
import { Lesson } from '@naite/types';

interface Props {
  title: string;
  lessons: Lesson[];
}

const LessonsWidget = ({ title, lessons }: Props): ReactElement => {
  return (
    <VStack width="full" overflowX="scroll" alignItems="flex-start">
      <Text fontSize={24}>{title}</Text>
      <Grid gridTemplateColumns="1fr 1fr 1fr 1fr" gap="8px">
        {lessons.length ? (
          lessons.map((lesson) => (
            <LessonCard key={lesson.id} lesson={lesson} />
          ))
        ) : (
          <Text>No lessons yet</Text>
        )}
      </Grid>
    </VStack>
  );
};

export default LessonsWidget;
