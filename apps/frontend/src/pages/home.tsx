import { Button, Card, Show, useDisclosure, VStack } from '@chakra-ui/react';
import { FormEventHandler, ReactElement, useEffect, useState } from 'react';
import SelectInput from '../components/Inputs/SelectInput';
import { Language, Lesson } from '@naite/types';
import LessonsWidget from '../components/LessonsWidget';
import ModalContainer from '../components/ModalContainer';
import DrawerContainer from '../components/DrawerContainer';
import LessonForm from '../components/LessonForm';
import { useLessons } from '../services/lesson.service';

const HomePage = (): ReactElement => {
  const { data: lessons = [] } = useLessons();
  const [language, setLanguage] = useState(Language.German);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [recommendedLesson, setRecommendedLesson] = useState<Partial<Lesson>>();

  useEffect(() => {
    if (recommendedLesson) {
      onOpen();
    }
  }, [onOpen, recommendedLesson]);

  const onSubmit: FormEventHandler = (event) => {
    event.preventDefault();
  };

  const handleClose = (): void => {
    setRecommendedLesson(undefined);
    onClose();
  };

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
      <Show above="md">
        <ModalContainer
          isOpen={isOpen}
          onClose={handleClose}
          onSubmit={onSubmit}
          title="Add new Lesson"
          confirmText="Add"
        >
          <LessonForm language={language} />
        </ModalContainer>
      </Show>
      <Show below="md">
        <DrawerContainer
          isOpen={isOpen}
          onClose={handleClose}
          onSubmit={onSubmit}
          title="Add new Lesson"
          confirmText="Add"
        >
          <LessonForm language={language} />
        </DrawerContainer>
      </Show>
    </Card>
  );
};

export default HomePage;
