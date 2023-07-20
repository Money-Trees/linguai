import {
  FormEventHandler,
  PropsWithChildren,
  ReactElement,
  useRef,
} from 'react';
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title: string;
  confirmText: string;
  isLoading?: boolean;
}

const ModalContainer = ({
  title,
  isOpen,
  onSubmit,
  onClose,
  confirmText,
  children,
  isLoading,
}: PropsWithChildren<Props>): ReactElement => {
  const initialFocusRef = useRef(null);

  const handleSubmit: FormEventHandler = (event) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      initialFocusRef={initialFocusRef}
      size="5xl"
    >
      <ModalOverlay />
      <ModalContent ref={initialFocusRef} as="form" onSubmit={handleSubmit}>
        <ModalCloseButton />
        <ModalHeader>{title}</ModalHeader>
        <ModalBody>{children}</ModalBody>
        <ModalFooter>
          <Button
            disabled={isLoading}
            variant="ghost"
            onClick={() => onClose()}
          >
            Cancel
          </Button>
          <Button isLoading={isLoading} type="submit">
            {confirmText}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalContainer;
