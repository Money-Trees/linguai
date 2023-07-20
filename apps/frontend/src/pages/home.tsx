import { Button, Card, useDisclosure, VStack } from '@chakra-ui/react';
import { ReactElement, useState } from 'react';
import SelectInput from '../components/Inputs/SelectInput';
import { Language } from '@naite/types';
import LessonsWidget from '../components/LessonsWidget';
import { useLessons } from '../services/lesson.service';
import LessonOverlay from '../components/LessonOverlay';

const HomePage = (): ReactElement => {
  const { data: lessons = [] } = useLessons();
  const [language, setLanguage] = useState(Language.German);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Card width="80%" p={8}>
      <VStack rowGap="32px">
        <SelectInput
          options={Object.values(Language)}
          value={language}
          label="Select your language"
          onChange={(newLanguage) => setLanguage(newLanguage as Language)}
          getOptionLabel={(option) => option}
        />
        <Button width="full" onClick={onOpen}>
          Add new Lesson
        </Button>
        <LessonsWidget
          title="Your Lessons"
          lessons={lessons}
          onStartLesson={() => null}
        />
      </VStack>
      <LessonOverlay isOpen={isOpen} onClose={onClose} language={language} />
    </Card>
  );
};

export default HomePage;
