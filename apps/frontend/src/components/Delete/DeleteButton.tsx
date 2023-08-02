import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  HStack,
  IconButton,
  Text,
} from '@chakra-ui/react';
import { useRef } from 'react';
import { AiFillDelete } from 'react-icons/ai';

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
}: DeleteButtonProps): JSX.Element => {
  const cancelRef = useRef(null);

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
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent width={['80%', 'md', 'md']}>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete {title}
            </AlertDialogHeader>
            <AlertDialogBody>
              <Text>Are you sure?</Text>
              <Text>You can't undo this action afterwards.</Text>
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button
                variant="ghost"
                colorScheme="gray"
                ref={cancelRef}
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                colorScheme="red"
                isLoading={isLoading}
                onClick={onDelete}
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default DeleteButton;
