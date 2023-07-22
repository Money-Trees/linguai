import { ReactElement, useState } from 'react';
import { Card, HStack, Input, Text } from '@chakra-ui/react';

interface Props {
  question: string;
}

const ClozeTestTask = ({ question }: Props): ReactElement => {
  const [inputValue, setInputValue] = useState<string>('');
  const regex = /\[.*?\]/;
  const tokens = question.split(/\s+/); // Tokenize by space (word boundaries)

  return (
    <Card
      backgroundColor="gray.300"
      _dark={{
        backgroundColor: 'gray.800',
      }}
      padding="4"
      whiteSpace="pre-wrap"
    >
      <HStack wrap={'wrap'}>
        {tokens.map((token, index) => {
          if (token.match(regex)) {
            return (
              <Input
                key={index}
                type="text"
                value={inputValue}
                variant={'filled'}
                colorScheme={'primary'}
                onChange={(e) => setInputValue(e.target.value)}
                size="sm"
                width={`${token.length * 8}px`} // Roughly set the width based on the word's length
                lineHeight="normal"
              />
            );
          } else {
            return <Text key={index}>{token}</Text>;
          }
        })}
        <Text>Holla</Text>
        <Text>Holla</Text>
        <Text>Holla</Text>
        <Text>Holla</Text>
        <Text>Holla</Text>
        <Text>Holla</Text>
        <Text>Holla</Text>
      </HStack>
    </Card>
  );
};

export default ClozeTestTask;
