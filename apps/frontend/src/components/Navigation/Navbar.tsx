import {
  Avatar,
  Flex,
  Heading,
  IconButton,
  Menu,
  MenuButton,
} from '@chakra-ui/react';
import { useMemo } from 'react';
import { FaBars } from 'react-icons/fa';
import { env } from '../../env';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { useAuthUser } from '../../services/user.service';
import { BANNER_HEIGHT } from '../DevBanner';
import { UserMenu } from './UserMenu';

interface NavbarProps {
  onOpen: () => void;
}

const Navbar = ({ onOpen }: NavbarProps): JSX.Element => {
  const { data: user } = useAuthUser();
  const title = useDocumentTitle();
  const avatar = useMemo(() => user?.image, [user?.image]);

  return (
    <Flex
      as="nav"
      display={{ base: 'flex', md: 'none' }}
      position="fixed"
      zIndex="sticky"
      insetX="0"
      backgroundColor="white"
      _dark={{
        backgroundColor: 'gray.800',
      }}
      top={env.IS_DEV ? BANNER_HEIGHT : '0'}
      height="16"
      padding="3"
      alignItems="center"
      justifyContent="space-between"
    >
      <IconButton
        aria-label="menu"
        variant="unstyled"
        color="gray.800"
        _dark={{ color: 'gray.200' }}
        display={{ md: 'none' }}
        icon={<FaBars />}
        onClick={onOpen}
      />
      <Heading size="md" color="primary.500">
        {title}
      </Heading>
      <Menu>
        <MenuButton as={Avatar} size="sm" src={avatar} />
        <UserMenu />
      </Menu>
    </Flex>
  );
};

export default Navbar;
