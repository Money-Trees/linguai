import { ReactElement, useEffect, useMemo, useState } from 'react';
import { Card, HStack, Input, Text, VStack } from '@chakra-ui/react';

interface Props {
  question: string;
  onInputValuesChange: (inputValues: string[]) => void;
}

const ClozeTestTask = ({
  question,
  onInputValuesChange,
}: Props): ReactElement => {
  const regex = useMemo(() => /\[.*?]/, []);
  const descriptionTokens = useMemo(
    () => question.match(/\{.*?}/g) || [],
    [question]
  );
  const tokens = useMemo(
    () => question.replace(/\{.*?}/g, '').split(/\s+/),
    [question]
  );
  const [inputValues, setInputValues] = useState<string[]>(
    tokens.filter((token) => regex.test(token)).map(() => '')
  );

  useEffect(() => {
    setInputValues(tokens.filter((token) => regex.test(token)).map(() => ''));
  }, [regex, tokens]);

  useEffect(() => {
    onInputValuesChange(inputValues);
  }, [inputValues, onInputValuesChange]);

  const handleChange = (index: number, newValue: string): void => {
    setInputValues(
      inputValues.map((currentValue, i) =>
        index === i ? newValue : currentValue
      )
    );
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
      <HStack wrap={'wrap'} alignItems="flex-start">
        {tokens.map((token, index) => {
          if (token.match(regex)) {
            const inputIndex = tokens
              .filter((token) => regex.test(token))
              .findIndex((t) => t === token);

            return (
              <VStack key={token}>
                <Input
                  isRequired
                  key={index}
                  type="text"
                  value={inputValues[inputIndex] || ''}
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
                  onChange={(e) => handleChange(inputIndex, e.target.value)}
                  size="sm"
                  borderRadius="4px"
                  width={`${
                    Math.max(token.length, inputValues[inputIndex]?.length) * 18
                  }px`} // Roughly set the width based on the word's length
                  lineHeight="normal"
                />
                <Text as="small" color="gray.200">
                  {descriptionTokens[inputIndex] &&
                    descriptionTokens[inputIndex]
                      .replace('{', '')
                      .replace('}', '')}
                </Text>
              </VStack>
            );
          } else {
            return (
              <Text fontSize={22} key={index}>
                {token}
              </Text>
            );
          }
        })}
      </HStack>
    </Card>
  );
};

export default ClozeTestTask;
