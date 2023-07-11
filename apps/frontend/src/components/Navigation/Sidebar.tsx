import {
  Avatar,
  Box,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Hide,
  Menu,
  MenuButton,
  Show,
  Text,
} from '@chakra-ui/react';
import { useAuthUser } from '../../services/user.service';
import Logo from './Logo';
import SidebarLinks from './SidebarLinks';
import { UserMenu } from './UserMenu';

export const SIDEBAR_WIDTH = '260px';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps): JSX.Element => {
  const { data: user } = useAuthUser();

  return (
    <>
      <Hide breakpoint="md">
        <Drawer isOpen={isOpen} onClose={onClose} placement="left" size="xs">
          <DrawerOverlay />
          <DrawerContent maxWidth={SIDEBAR_WIDTH}>
            <DrawerBody
              padding="0"
              backgroundColor="gray.200"
              _dark={{ backgroundColor: 'gray.800' }}
              color="white"
            >
              <Logo />
              <SidebarLinks onClose={onClose} user={user} />
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Hide>
      <Show above="md">
        <Flex
          flexDirection="column"
          width={SIDEBAR_WIDTH}
          backgroundColor="gray.200"
          _dark={{ backgroundColor: 'gray.800' }}
          overflowY="scroll"
        >
          <Box flexGrow="1">
            <Logo />
            <SidebarLinks onClose={onClose} user={user} />
          </Box>
          <Menu>
            <MenuButton
              margin="3"
              padding="3"
              textAlign="left"
              _hover={{
                backgroundColor: 'gray.300',
                borderRadius: 'base',
                color: 'black',
                _dark: {
                  backgroundColor: 'gray.700',
                  color: 'white',
                },
              }}
            >
              <Flex
                gap="2"
                alignItems="center"
                transitionDuration="500ms"
                fontWeight="bold"
              >
                <Avatar src={user?.image} />
                <Box>
                  <Text
                    fontSize="sm"
                    color="gray.700"
                    _dark={{ color: 'gray.300' }}
                  >
                    {user?.firstname} {user?.lastname}
                  </Text>
                </Box>
              </Flex>
            </MenuButton>
            <UserMenu />
          </Menu>
        </Flex>
      </Show>
    </>
  );
};

export default Sidebar;
