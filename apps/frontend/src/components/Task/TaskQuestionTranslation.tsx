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
  const tokens = translation.split(/\s+/);

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
              {regex.test(token) ? (
                <Text
                  as="span"
                  textDecor={highlightModelAnswer ? 'underline' : ''}
                >
                  {token.replace('[', ' ').replace(']', ' ')}
                </Text>
              ) : (
                ` ${token}`
              )}
            </React.Fragment>
          ))}
        </Text>
      </HStack>
    </Card>
  );
};

export default TaskQuestionTranslation;
