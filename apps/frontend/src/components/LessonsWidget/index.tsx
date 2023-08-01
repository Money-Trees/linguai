import { ReactElement } from 'react';
import { VStack, Text, Grid, useBreakpointValue } from '@chakra-ui/react';
import LessonCard from './LessonCard';
import { Lesson } from '@naite/types';

interface Props {
  title: string;
  lessons: Lesson[];
}

const LessonsWidget = ({ title, lessons }: Props): ReactElement => {
  const gridTemplateColumns = useBreakpointValue({
    base: 'repeat(1, 1fr)',
    sm: 'repeat(2, 1fr)',
    md: 'repeat(3, 1fr)',
    lg: 'repeat(4, 1fr)',
    xl: 'repeat(5, 1fr)',
  });

  return (
    <VStack width="full" overflowX="scroll" alignItems="flex-start">
      <Text fontSize={['lg', 'xl', '2xl']}>{title}</Text>
      <Grid gap="8px" templateColumns={gridTemplateColumns}>
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
