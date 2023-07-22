import { ReactElement, useState } from 'react';
import { Card, HStack, Input, Text } from '@chakra-ui/react';

interface Props {
  question: string;
}

const ClozeTestTask = ({ question }: Props): ReactElement => {
  const [inputValue, setInputValue] = useState<string>('');
  const regex = /\[.*?]/;
  const tokens = question.split(/\s+/); // Tokenize by space (word boundaries)

  return (
    <Card
      backgroundColor="gray.300"
      _dark={{
        backgroundColor: 'gray.800',
      }}
      padding="4"
      whiteSpace="pre-wrap"
      width="100%"
    >
      <HStack wrap={'wrap'}>
        {tokens.map((token, index) => {
          if (token.match(regex)) {
            return (
              <Input
                isRequired
                key={index}
                type="text"
                value={inputValue}
                variant="filled"
                bg="gray.400"
                fontWeight="bold"
                fontSize="18px"
                _dark={{
                  backgroundColor: 'gray.600',
                }}
                _hover={{
                  filter: 'brightness(0.8)',
                }}
                onChange={(e) => setInputValue(e.target.value)}
                size="sm"
                borderRadius="4px"
                width={`${Math.max(token.length, inputValue.length) * 12}px`} // Roughly set the width based on the word's length
                lineHeight="normal"
              />
            );
          } else {
            return <Text key={index}>{token}</Text>;
          }
        })}
      </HStack>
    </Card>
  );
};

export default ClozeTestTask;
