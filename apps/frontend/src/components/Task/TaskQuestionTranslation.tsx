import React from 'react';
import { Card, HStack, Text } from '@chakra-ui/react';

interface TaskQuestionTranslationProps {
  translation: string;
  highlightModelAnswer?: boolean;
}

const TaskQuestionTranslation = ({
  translation,
  highlightModelAnswer = false,
}: TaskQuestionTranslationProps): React.JSX.Element => {
  const regex = /\[.*?]/;
  const tokens = translation.split(regex); // Split by square brackets
  const matches = translation.match(regex); // Find all occurrences of square brackets

  return (
    <Card
      padding="4"
      backgroundColor="gray.300"
      _dark={{
        backgroundColor: 'gray.800',
      }}
      width="100%"
    >
      <HStack>
        <Text as="b">Translation:</Text>
        <Text>
          {tokens.map((token, index) => (
            <React.Fragment key={index}>
              {token}
              {matches && matches[index] && (
                <Text
                  as="span"
                  textDecor={highlightModelAnswer ? 'underline' : ''}
                >
                  {matches[index].slice(1, -1)}
                </Text>
              )}
            </React.Fragment>
          ))}
        </Text>
      </HStack>
    </Card>
  );
};

export default TaskQuestionTranslation;
