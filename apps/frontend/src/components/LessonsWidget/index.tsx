import { ReactElement } from 'react';
import { VStack, Text, Grid } from '@chakra-ui/react';
import LessonCard from './LessonCard';
import { Lesson } from '@naite/types';

interface Props {
  title: string;
  lessons: Lesson[];
  onStartLesson: (lesson: Lesson) => void;
}

const LessonsWidget = ({
  title,
  lessons,
  onStartLesson,
}: Props): ReactElement => {
  return (
    <VStack width="full" overflowX="scroll" alignItems="flex-start">
      <Text fontSize={24}>{title}</Text>
      <Grid gridTemplateColumns="1fr 1fr 1fr 1fr" gap="8px">
        {lessons.length ? (
          lessons.map((lesson) => (
            <LessonCard
              key={lesson.id}
              lesson={lesson}
              onStartLesson={onStartLesson}
            />
          ))
        ) : (
          <Text>No lessons yet</Text>
        )}
      </Grid>
    </VStack>
  );
};

export default LessonsWidget;
