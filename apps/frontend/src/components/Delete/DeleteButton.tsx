import { Button, HStack, IconButton } from '@chakra-ui/react';
import { ReactElement } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import AlertDiagram from '../AlertDiagram';

interface DeleteButtonProps {
  title: string;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onDelete: () => void;
  isLoading?: boolean;
  buttonText?: string;
  icon?: boolean;
}

const DeleteButton = ({
  title,
  onClose,
  isLoading,
  isOpen,
  onOpen,
  onDelete,
  buttonText,
  icon,
}: DeleteButtonProps): ReactElement => {
  const deleteButton =
    icon && !buttonText ? (
      <IconButton
        aria-label="Delete"
        icon={<AiFillDelete />}
        variant="ghost"
        colorScheme="red"
        onClick={onOpen}
      />
    ) : (
      <Button
        leftIcon={<AiFillDelete />}
        aria-label="Delete"
        variant="ghost"
        colorScheme="red"
        onClick={onOpen}
        width={'full'}
      >
        {buttonText}
      </Button>
    );

  return (
    <>
      <HStack>{deleteButton}</HStack>
      <AlertDiagram
        open={isOpen}
        onClose={onClose}
        title={title}
        loading={isLoading}
        onClick={onDelete}
      />
    </>
  );
};

export default DeleteButton;
