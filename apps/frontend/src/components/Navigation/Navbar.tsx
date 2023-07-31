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
import { Link } from 'react-router-dom';

const Navbar = (): ReactElement => {
  const { data: user } = useAuthUser();
  const avatar = useMemo(() => user?.image, [user?.image]);
  const title = useDocumentTitle();

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
      <Link to="/">
        <Heading size="md" color="primary.500" cursor="pointer">
          {title}
        </Heading>
      </Link>
      <Menu>
        <MenuButton
          as={Avatar}
          size="sm"
          name={`${user?.firstname} ${user?.lastname}`}
          src={avatar}
        />
        <UserMenu />
      </Menu>
    </Flex>
  );
};

export default Navbar;
