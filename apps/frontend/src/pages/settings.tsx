import React, { useState } from 'react';
import {
  Box,
  Heading,
  Avatar,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Switch,
  Card,
  VStack,
  useColorMode,
} from '@chakra-ui/react';

type Settings = {
  profileImage: string;
};

const SettingsPage: React.FC = () => {
  const [settings, setSettings] = useState<Settings>({
    profileImage: '',
  });

  const { colorMode, toggleColorMode } = useColorMode();

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      profileImage: e.target.value,
    }));
  };

  const saveSettings = (): void => {
    console.log('save');
  };

  return (
    <Card width="80%" p={8}>
      <VStack rowGap="32px">
        <Box p={4}>
          <Heading size="lg" mb={4}>
            Settings
          </Heading>
          <Stack spacing={4}>
            <Box>
              <Heading size="md">Profile Image</Heading>
              <Avatar
                size="lg"
                name="Profile Image"
                src={settings.profileImage}
              />
              <FormControl mt={2}>
                <FormLabel>Image URL</FormLabel>
                <Input
                  type="text"
                  value={settings.profileImage}
                  onChange={handleProfileImageChange}
                  placeholder="Enter image URL"
                />
              </FormControl>
            </Box>
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
            <Button colorScheme="blue" onClick={saveSettings}>
              Save Settings
            </Button>
          </Stack>
        </Box>
      </VStack>
    </Card>
  );
};

export default SettingsPage;
