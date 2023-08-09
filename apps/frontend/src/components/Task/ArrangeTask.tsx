import { Card, Flex, VStack } from '@chakra-ui/react';
import React, { ReactElement, useEffect, useMemo, useState } from 'react';
import { shuffleArray } from '@naite/utils';
import TaskQuestionTranslation from './TaskQuestionTranslation';

interface Props {
  question: string;
  translation: string;
  onInputValuesChange: (inputValues: string) => void;
}

const ArrangeTask = ({
  question,
  translation,
  onInputValuesChange,
}: Props): ReactElement => {
  const tokens = useMemo(() => question.split(/\s+/), [question]);
  const [arrangedTokens, setArrangedTokens] = useState<string[]>([]);
  const [unarrangedTokens, setUnarrangedTokens] = useState<string[]>(tokens);

  useEffect(() => {
    shuffleArray(tokens);
  }, [tokens]);

  useEffect(() => {
    if (!unarrangedTokens.length) {
      onInputValuesChange(arrangedTokens.join(' '));
    } else {
      onInputValuesChange('');
    }
  }, [arrangedTokens, onInputValuesChange, unarrangedTokens]);

  const handleUnarrangedTokenClick = (token: string): void => {
    setArrangedTokens((prevState) => [...prevState, token]);
    setUnarrangedTokens((prevState) => prevState.filter((t) => t !== token));
  };

  const handleArrangedTokenClick = (token: string): void => {
    setUnarrangedTokens((prevState) => [...prevState, token]);
    setArrangedTokens((prevState) => prevState.filter((t) => t !== token));
  };

  return (
    <VStack width="full">
      <TaskQuestionTranslation translation={translation} />
      <Flex
        gap={2}
        width="full"
        minHeight={50}
        backgroundColor="gray.100"
        _dark={{ backgroundColor: 'gray.900' }}
        p={2}
      >
        {arrangedTokens.map((token, index) => (
          <Card
            key={token + index}
            p={2}
            onClick={() => handleArrangedTokenClick(token)}
          >
            {token}
          </Card>
        ))}
      </Flex>
      <Flex
        gap={2}
        backgroundColor="gray.100"
        _dark={{ backgroundColor: 'gray.900' }}
        p={4}
      >
        {unarrangedTokens.map((token, index) => (
          <Card
            key={token + index}
            p={2}
            onClick={() => handleUnarrangedTokenClick(token)}
          >
            {token}
          </Card>
        ))}
      </Flex>
    </VStack>
  );
};

export default ArrangeTask;
