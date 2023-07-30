import { ReactElement } from 'react';
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
  Subtopic,
} from '@naite/types';
import SelectInput from '../Inputs/SelectInput';

interface Props {
  lessonData: Partial<Lesson>;
  onChange: (key: keyof Lesson, value: unknown) => void;
}

const getTopics = (language?: Language): Subtopic[] => {
  if (!language) {
    return Object.values(GermanTopic);
  }

  switch (language) {
    case Language.French:
      return Object.values(FrenchTopic);

    case Language.German:
      return Object.values(GermanTopic);
  }
};

const LessonForm = ({ lessonData, onChange }: Props): ReactElement => {
  return (
    <VStack gap="16px" alignItems="flex-start">
      <FormControl isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          value={lessonData.name}
          onChange={(event) => onChange('name', event.target.value)}
        />
      </FormControl>
      <Box>
        <Heading size="md">What would you like to practice?</Heading>
        <FormControl isRequired>
          <FormLabel>Topic</FormLabel>
          <Text fontSize={12}>e.g. Work, Travel, Hobbies...</Text>
          <Input
            value={lessonData.theme}
            onChange={(event) => onChange('theme', event.target.value)}
          />
        </FormControl>
        <SelectInput
          label="Grammar concept"
          options={getTopics(lessonData.language)}
          value={lessonData.subtopic as string}
          onChange={(value) => onChange('subtopic', value)}
          getOptionLabel={(option) => option}
        />
      </Box>
    </VStack>
  );
};

export default LessonForm;
