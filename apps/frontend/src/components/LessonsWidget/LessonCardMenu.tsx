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
import DeleteButton from '../Delete/DeleteButton';
import { useDeleteLesson } from '../../services/lesson.service';
import { Lesson } from '@naite/types';

interface LessonCardMenuProps {
  lesson: Lesson;
}

export const LessonCardMenu = ({
  lesson,
}: LessonCardMenuProps): React.JSX.Element => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const { mutate: deleteLesson } = useDeleteLesson();

  return (
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
        <MenuItem>
          <DeleteButton
            onClose={onClose}
            onDelete={() => deleteLesson(lesson.id)}
            onOpen={onOpen}
            isOpen={isOpen}
            title={'Lesson'}
            buttonText={'Delete Lesson'}
            icon={true}
          />
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
