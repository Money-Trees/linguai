import { ReactElement } from 'react';
import { Card, Text } from '@chakra-ui/react';

interface Props {
  question: string;
}

const ClozeTestTask = ({ question }: Props): ReactElement => {
  const questionSegments = question.split(new RegExp('\\[(.*?)]'));
  console.log(questionSegments);

  return (
    <Card
      backgroundColor="gray.300"
      _dark={{
        backgroundColor: 'gray.800',
      }}
    >
      {questionSegments.map((questionSegment, index) => (
        <Text>{`${questionSegment} ${
          index + 1 !== questionSegments.length ? '___' : ''
        }`}</Text>
      ))}
    </Card>
  );
};

export default ClozeTestTask;
