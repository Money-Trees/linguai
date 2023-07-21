import { Link, List, ListItem } from '@chakra-ui/react';
import { Role, User } from '@naite/types';
import { NavLink } from 'react-router-dom';
import { navigationRoutes } from '../../routes';

interface SidebarLinksProps {
  onClose: () => void;
  user?: User;
}

const SidebarLinks = ({ onClose, user }: SidebarLinksProps): JSX.Element => (
  <List width="full">
    {navigationRoutes
      .filter(
        ({ restrictions }) =>
          !restrictions?.length ||
          restrictions.includes(user?.role || Role.User)
      )
      .map(({ path, label }) => (
        <ListItem key={`sidebar-${path}`} display="flex">
          <Link
            _activeLink={{
              backgroundColor: 'white',
              borderRadius: 'base',
              color: 'black',
              '> svg': { fill: 'primary.500' },
              _dark: {
                backgroundColor: 'gray.900',
                color: 'white',
              },
            }}
            _hover={{
              backgroundColor: 'gray.300',
              borderRadius: 'base',
              color: 'black',
              _dark: {
                backgroundColor: 'gray.700',
                color: 'white',
              },
            }}
            as={NavLink}
            to={path}
            end
            transitionDuration="500ms"
            marginX="3"
            marginY="1"
            width="full"
            padding="3"
            fontWeight="bold"
            color="gray.500"
            display="flex"
            alignItems="center"
            gap="4"
            onClick={onClose}
          >
            {label}
          </Link>
        </ListItem>
      ))}
  </List>
);

export default SidebarLinks;
