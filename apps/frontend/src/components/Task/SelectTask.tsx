import { ReactElement, useState } from 'react';
import { Card, Flex, VStack } from '@chakra-ui/react';

interface Props {
  question: string;
  options: string;
  onInputValuesChange: (inputValues: string) => void;
}

const SelectTask = ({
  question,
  options,
  onInputValuesChange,
}: Props): ReactElement => {
  const [selectedOption, setSelectedOption] = useState<string>();

  const handleClick = (option: string): void => {
    onInputValuesChange(option);
    setSelectedOption(option);
  };

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
      <VStack gap={8}>
        <Card p={2}>{question}</Card>
        <Flex flexDirection="column" flexWrap="wrap" gap={2} minWidth="50%">
          {options.split(',').map((option) => (
            <Card
              key={option}
              onClick={() => handleClick(option)}
              p={2}
              border={option === selectedOption ? '2px solid' : ''}
            >
              {option}
            </Card>
          ))}
        </Flex>
      </VStack>
    </Card>
  );
};

export default SelectTask;
