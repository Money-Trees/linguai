import { ReactElement } from 'react';
import { VStack, Text, Card, Grid } from '@chakra-ui/react';

interface Props {
  title: string;
  lessonNames: string[];
  onSelect: (lessonName: string) => void;
}

const LessonsWidget = ({
  title,
  lessonNames,
  onSelect,
}: Props): ReactElement => {
  return (
    <VStack width="full" overflowX="scroll" alignItems="flex-start">
      <Text fontSize={24}>{title}</Text>
      <Grid gridTemplateColumns="1fr 1fr 1fr 1fr" gap="8px">
        {lessonNames.length ? (
          lessonNames.map((lesson) => (
            <Card
              key={lesson}
              p={4}
              textAlign="center"
              cursor="pointer"
              onClick={() => onSelect(lesson)}
            >
              <Text as="b" textTransform="capitalize">
                {lesson}
              </Text>
            </Card>
          ))
        ) : (
          <Text>No lessons</Text>
        )}
      </Grid>
    </VStack>
  );
};

export default LessonsWidget;
