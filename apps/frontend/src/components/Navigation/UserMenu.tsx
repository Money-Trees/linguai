import { MenuItem, MenuList } from '@chakra-ui/react';
import { AiOutlineLogout, AiOutlineUser } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { useLogout } from '../../services/auth.service';

export const UserMenu = (): JSX.Element => {
  const { mutate: logout } = useLogout();

  return (
    <MenuList>
      <MenuItem icon={<AiOutlineUser />} as={Link} to="/profile">
        Profile
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
