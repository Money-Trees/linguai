import {
  Box,
  CircularProgress,
  ListItem,
  UnorderedList,
  VStack,
} from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';
import { ResponseError, Role } from '@naite/types';
import { AxiosError } from 'axios';
import isArray from 'lodash/isArray';
import { Route, Routes } from 'react-router-dom';
import DevBanner, { BANNER_HEIGHT } from './components/DevBanner';
import Navbar from './components/Navigation/Navbar';
import { env } from './env';
import { useNotification } from './hooks/useNotification';
import LoginPage from './pages/login';
import NotFoundPage from './pages/notfound';
import { routes } from './routes';
import { getErrorMessage } from './services/api.service';
import { useAuthStatus } from './services/auth.service';
import { useAuthUser } from './services/user.service';
import { ReactElement } from 'react';

const App = (): ReactElement => {
  const queryClient = useQueryClient();
  queryClient.setDefaultOptions({
    queries: {
      refetchOnWindowFocus: false,
    },
    mutations: {
      onError: (error) => {
        const message = getErrorMessage(error);
        const messages = isArray(message) ? message : [message];

        notification({
          title: (error as AxiosError<ResponseError>).response?.status || 500,
          status: 'error',
          description: (
            <UnorderedList>
              {messages.map((msg) => (
                <ListItem key={msg}>{msg}</ListItem>
              ))}
            </UnorderedList>
          ),
        });
      },
    },
  });

  const notification = useNotification();
  const { data: authenticated, isLoading } = useAuthStatus();
  const { data: user } = useAuthUser();

  const height = env.IS_DEV
    ? `calc(100vh - var(--chakra-space-${BANNER_HEIGHT}))`
    : '100vh';

  if (isLoading) {
    return (
      <Box width="100vw" height={height} placeItems="center">
        {env.IS_DEV && <DevBanner />}
        <CircularProgress isIndeterminate value={80} />
      </Box>
    );
  }

  if (!authenticated?.authenticated) {
    return <LoginPage height={height} />;
  }

  return (
    <>
      {env.IS_DEV && <DevBanner />}
      <Box
        width="100vw"
        backgroundColor="gray.100"
        _dark={{ backgroundColor: 'gray.900' }}
        paddingBottom={8}
      >
        <VStack gap={8} width="100vw">
          <Navbar />
          <Routes>
            {routes
              .filter(
                ({ restrictions }) =>
                  !restrictions?.length ||
                  restrictions.includes(user?.role || Role.User)
              )
              .map(({ path, component }) => (
                <Route path={path} element={component} key={`route-${path}`} />
              ))}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </VStack>
      </Box>
    </>
  );
};

export default App;
