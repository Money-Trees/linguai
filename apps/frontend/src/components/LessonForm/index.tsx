import { ReactElement } from 'react';
import { FormControl, FormLabel, Input, VStack, Text } from '@chakra-ui/react';

const LessonForm = (): ReactElement => {
  // const [lessonData, setLessonData] = useState<Partial<Lesson>>({});

  return (
    <VStack>
      <FormControl>
        <FormLabel>What topic would you like to practice?</FormLabel>
        <Text fontSize={12}>e.g. Work, Travel, Hobbies...</Text>
        <Input />
      </FormControl>
      {/*<SelectInput*/}
      {/*  options={['Article', 'Sentence Structure', 'Tenses']}*/}
      {/*  value={lessonData}*/}
      {/*  label={}*/}
      {/*  onChange={}*/}
      {/*  getOptionLabel={}*/}
      {/*/>*/}
    </VStack>
  );
};

export default LessonForm;
