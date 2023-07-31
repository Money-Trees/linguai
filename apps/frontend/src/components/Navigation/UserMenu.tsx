import { MenuItem, MenuList, useColorMode } from '@chakra-ui/react';
import { AiOutlineLogout, AiOutlineUser } from 'react-icons/ai';
import { FaMoon, FaSun } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useLogout } from '../../services/auth.service';

export const UserMenu = (): JSX.Element => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { mutate: logout } = useLogout();

  return (
    <MenuList>
      <MenuItem icon={<AiOutlineUser />} as={Link} to="/profile">
        Profile
      </MenuItem>
      <MenuItem
        icon={colorMode === 'dark' ? <FaSun /> : <FaMoon />}
        onClick={toggleColorMode}
      >
        {colorMode === 'dark' ? 'Light Mode' : 'Dark Mode'}
      </MenuItem>
      <MenuItem
        onClick={() =>
          logout(null, {
            onSuccess: () => {
              window.location.reload();
            },
          })
        }
        icon={<AiOutlineLogout />}
      >
        Logout
      </MenuItem>
    </MenuList>
  );
};
