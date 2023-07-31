import React, { useMemo } from 'react';
import {
  Box,
  Heading,
  Avatar,
  FormControl,
  FormLabel,
  Stack,
  Switch,
  Card,
  VStack,
  useColorMode,
  HStack,
} from '@chakra-ui/react';
import { useAuthUser } from '../services/user.service';

const ProfilePage: React.FC = () => {
  const { data: user } = useAuthUser();
  const avatar = useMemo(() => user?.image, [user?.image]);
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Card width="80%" p={8}>
      <VStack rowGap="32px">
        <Box p={4}>
          <Heading size="lg" mb={4}>
            Profile
          </Heading>
          <Stack spacing={4}>
            <HStack marginBottom={4} spacing={4}>
              <Avatar
                size="lg"
                name={`${user?.firstname} ${user?.lastname}`}
                src={avatar}
              />
              <Heading
                size={'md'}
              >{`${user?.firstname} ${user?.lastname}`}</Heading>
            </HStack>
            <Box>
              <Heading size="md">Theme</Heading>
              <FormControl display="flex" alignItems="center">
                <FormLabel htmlFor="darkMode" mb="0">
                  Dark Mode
                </FormLabel>
                <Switch
                  id="darkMode"
                  ml={2}
                  isChecked={colorMode === 'dark'}
                  onChange={toggleColorMode}
                />
              </FormControl>
            </Box>
          </Stack>
        </Box>
      </VStack>
    </Card>
  );
};

export default ProfilePage;
