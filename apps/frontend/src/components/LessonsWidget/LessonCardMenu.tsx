import React from 'react';
import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
} from '@chakra-ui/react';
import { FaEllipsisV } from 'react-icons/fa';
import { useDeleteLesson } from '../../services/lesson.service';
import { Lesson } from '@naite/types';
import AlertDiagram from '../AlertDiagram';

interface LessonCardMenuProps {
  lesson: Lesson;
}

export const LessonCardMenu = ({
  lesson,
}: LessonCardMenuProps): React.JSX.Element => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const { mutate: deleteLesson } = useDeleteLesson();

  return (
    <>
      <AlertDiagram
        open={isOpen}
        title={'Delete Lesson'}
        onClick={() => deleteLesson(lesson.id)}
        onClose={onClose}
      />
      <Menu>
        <MenuButton
          as={IconButton}
          alignItems={'center'}
          display={'flex'}
          justifyContent={'end'}
          aria-label="menu"
          variant="unstyled"
          _dark={{ color: 'gray.200' }}
          icon={<FaEllipsisV />}
        />
        <MenuList>
          <MenuItem isDisabled>Rename</MenuItem>
          <MenuItem onClick={onOpen}>Delete</MenuItem>
        </MenuList>
      </Menu>
    </>
  );
};
