import {
  FormEventHandler,
  PropsWithChildren,
  ReactElement,
  useRef,
} from 'react';
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
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
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      initialFocusRef={initialFocusRef}
      placement="bottom"
      size="full"
    >
      <DrawerOverlay />
      <DrawerContent ref={initialFocusRef} as="form" onSubmit={handleSubmit}>
        <DrawerCloseButton />
        <DrawerHeader>{title}</DrawerHeader>
        <DrawerBody
          display="grid"
          gridTemplateColumns="1fr 1fr"
          gap="4"
          flexDirection="column"
        >
          {children}
        </DrawerBody>
        <DrawerFooter>
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
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default ModalContainer;
