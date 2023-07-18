import { ReactElement, useState } from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react';
import {
  FrenchTopic,
  GermanTopic,
  Language,
  Lesson,
  Topic,
} from '@naite/types';
import SelectInput from '../Inputs/SelectInput';

interface Props {
  language: Language;
}

const getTopics = (language: Language): Topic[] => {
  switch (language) {
    case Language.French:
      return Object.values(FrenchTopic);

    case Language.German:
      return Object.values(GermanTopic);
  }
};

const LessonForm = ({ language }: Props): ReactElement => {
  const [lessonData, setLessonData] = useState<Partial<Lesson>>({ language });

  return (
    <VStack gap="16px" alignItems="flex-start">
      <FormControl isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          value={lessonData.theme}
          onChange={(event) =>
            setLessonData((prevState) => ({
              ...prevState,
              name: event.target.value,
            }))
          }
        />
      </FormControl>
      <Box>
        <Heading size="md">What would you like to practice?</Heading>
        <FormControl isRequired>
          <FormLabel>Topic</FormLabel>
          <Text fontSize={12}>e.g. Work, Travel, Hobbies...</Text>
          <Input
            value={lessonData.theme}
            onChange={(event) =>
              setLessonData((prevState) => ({
                ...prevState,
                theme: event.target.value,
              }))
            }
          />
        </FormControl>
        <SelectInput
          options={getTopics(language)}
          value={lessonData.topic as string}
          label="Grammar concept"
          onChange={(value) =>
            setLessonData((prevState) => ({
              ...prevState,
              topic: value as Topic,
            }))
          }
          getOptionLabel={(option) => option}
        />
      </Box>
    </VStack>
  );
};

export default LessonForm;
