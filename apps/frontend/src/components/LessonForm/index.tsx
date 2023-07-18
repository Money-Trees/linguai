import { ReactElement, useState } from 'react';
import { FormControl, FormLabel, Input, Text, VStack } from '@chakra-ui/react';
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
  initialLessonData?: Partial<Lesson>;
}

const getTopics = (language: Language): Topic[] => {
  switch (language) {
    case Language.French:
      return Object.values(FrenchTopic);

    case Language.German:
      return Object.values(GermanTopic);
  }
};

const LessonForm = ({ language, initialLessonData }: Props): ReactElement => {
  const [lessonData, setLessonData] = useState<Partial<Lesson>>(
    initialLessonData || {}
  );

  return (
    <VStack>
      <FormControl isRequired>
        <FormLabel>What topic would you like to practice?</FormLabel>
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
        label="What would you like to practice?"
        onChange={(value) =>
          setLessonData((prevState) => ({
            ...prevState,
            topic: value as Topic,
          }))
        }
        getOptionLabel={(option) => option}
      />
    </VStack>
  );
};

export default LessonForm;
