import { Button, Show, useDisclosure, VStack } from '@chakra-ui/react';
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

  const recommendedTopics = [
    'hobbies',
    'family',
    'pets',
    'travel',
    'food',
    'country',
  ];

  const onSubmit: FormEventHandler = (event) => {
    event.preventDefault();
  };

  const handleClose = (): void => {
    setRecommendedLesson(undefined);
    onClose();
  };

  return (
    <>
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
          lessonNames={lessons.map((lesson: Lesson) => lesson.name)}
          onSelect={() => null}
        />
        <LessonsWidget
          title="Recommended Lessons"
          lessonNames={recommendedTopics}
          onSelect={(lessonName) => setRecommendedLesson({ theme: lessonName })}
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
          <LessonForm
            language={language}
            initialLessonData={recommendedLesson}
          />
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
          <LessonForm
            language={language}
            initialLessonData={recommendedLesson}
          />
        </DrawerContainer>
      </Show>
    </>
  );
};

export default HomePage;
