import React, { ReactElement, useRef } from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Text,
} from '@chakra-ui/react';

const AlertDiagram = ({
  open,
  onClose,
  title,
  loading,
  onClick,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  onClick: () => void;
  loading?: boolean | undefined;
}): ReactElement => {
  const cancelRef = useRef(null);

  return (
    <AlertDialog
      isOpen={open}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
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
              isLoading={loading}
              onClick={onClick}
              ml={3}
            >
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default AlertDiagram;
