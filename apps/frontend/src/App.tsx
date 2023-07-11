import {
  Box,
  CircularProgress,
  Grid,
  ListItem,
  UnorderedList,
  useDisclosure,
} from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';
import { ResponseError, Role } from '@naite/types';
import { AxiosError } from 'axios';
import isArray from 'lodash/isArray';
import { Route, Routes } from 'react-router-dom';
import DevBanner, { BANNER_HEIGHT } from './components/DevBanner';
import Navbar from './components/Navigation/Navbar';
import Sidebar, { SIDEBAR_WIDTH } from './components/Navigation/Sidebar';
import { env } from './env';
import { useNotification } from './hooks/useNotification';
import LoginPage from './pages/login';
import NotFoundPage from './pages/notfound';
import { routes } from './routes';
import { getErrorMessage } from './services/api.service';
import { useAuthStatus } from './services/auth.service';
import { useAuthUser } from './services/user.service';

const App = (): JSX.Element => {
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

  const { onOpen, onClose, isOpen } = useDisclosure();
  const notification = useNotification();
  const { data: authenticated, isLoading } = useAuthStatus();
  const { data: user } = useAuthUser();

  const height = env.IS_DEV
    ? `calc(100vh - var(--chakra-space-${BANNER_HEIGHT}))`
    : '100vh';

  if (isLoading) {
    return (
      <Grid width="100vw" height={height} placeItems="center">
        {env.IS_DEV && <DevBanner />}
        <CircularProgress isIndeterminate value={80} />
      </Grid>
    );
  }

  if (!authenticated?.authenticated) {
    return <LoginPage height={height} />;
  }

  return (
    <>
      {env.IS_DEV && <DevBanner />}
      <Grid
        gridTemplateColumns={{ md: `${SIDEBAR_WIDTH} 1fr` }}
        width="100vw"
        height={height}
        backgroundColor="gray.100"
        _dark={{ backgroundColor: 'gray.900' }}
      >
        <Sidebar isOpen={isOpen} onClose={onClose} />
        <Box
          height={height}
          overflow="scroll"
          padding={{ base: '4', md: '8' }}
          paddingTop={{ base: 20 + (env.IS_DEV ? BANNER_HEIGHT : 0), md: '8' }}
        >
          <Navbar onOpen={onOpen} />
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
        </Box>
      </Grid>
    </>
  );
};

export default App;
