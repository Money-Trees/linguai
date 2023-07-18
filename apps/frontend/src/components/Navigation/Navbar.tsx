import {
  Avatar,
  Flex,
  Heading,
  IconButton,
  Menu,
  MenuButton,
} from '@chakra-ui/react';
import { ReactElement, useMemo } from 'react';
import { FaBars } from 'react-icons/fa';
import { env } from '../../env';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { useAuthUser } from '../../services/user.service';
import { BANNER_HEIGHT } from '../DevBanner';
import { UserMenu } from './UserMenu';

const Navbar = (): ReactElement => {
  const { data: user } = useAuthUser();
  const title = useDocumentTitle();
  const avatar = useMemo(() => user?.image, [user?.image]);

  return (
    <Flex
      as="nav"
      display={{ base: 'flex' }}
      insetX="0"
      backgroundColor="white"
      _dark={{
        backgroundColor: 'gray.800',
      }}
      top={env.IS_DEV ? BANNER_HEIGHT : '0'}
      left={0}
      width="100vw"
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
