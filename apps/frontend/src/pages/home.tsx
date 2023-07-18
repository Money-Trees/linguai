import { Button, Show, useDisclosure, VStack } from '@chakra-ui/react';
import { FormEventHandler, ReactElement, useState } from 'react';
import SelectInput from '../components/Inputs/SelectInput';
import { Language } from '@naite/types';
import LessonsWidget from '../components/LessonsWidget';
import ModalContainer from '../components/ModalContainer';
import DrawerContainer from '../components/DrawerContainer';
import LessonForm from '../components/LessonForm';

const HomePage = (): ReactElement => {
  const [language, setLanguage] = useState(Language.German);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const recommendedTopics = [
    'hobbies',
    'family',
    'pets',
    'travel',
    'food',
    'country',
  ];

  const addLesson = (lessonName: string): void => {
    console.log(lessonName);
  };

  const onSubmit: FormEventHandler = (event) => {
    event.preventDefault();
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
          title="Lessons"
          lessonNames={[]}
          onSelect={(lessonName) => addLesson(lessonName)}
        />
        <LessonsWidget
          title="Recommended Lessons"
          lessonNames={recommendedTopics}
          onSelect={(lessonName) => addLesson(lessonName)}
        />
      </VStack>
      <Show above="md">
        <ModalContainer
          isOpen={isOpen}
          onClose={onClose}
          onSubmit={onSubmit}
          title="Add new Lesson"
          confirmText="Add"
        >
          <LessonForm />
        </ModalContainer>
      </Show>
      <Show below="md">
        <DrawerContainer
          isOpen={isOpen}
          onClose={onClose}
          onSubmit={onSubmit}
          title="Add new Lesson"
          confirmText="Add"
        >
          <LessonForm />
        </DrawerContainer>
      </Show>
    </>
  );
};

export default HomePage;
