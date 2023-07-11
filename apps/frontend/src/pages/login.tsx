import { Box, Button, Flex } from '@chakra-ui/react';
import DevBanner from '../components/DevBanner';
import LogoFull from '../components/LogoFull';
import { env } from '../env';

interface Props {
  height: string;
}

const LoginPage = ({ height }: Props): JSX.Element => {
  return (
    <Box width="100vw" height={height}>
      {env.IS_DEV && <DevBanner />}
      <Flex
        flexGrow={1}
        height="full"
        flexDirection="column"
        gap="6"
        alignItems="center"
        justifyContent="center"
      >
        <LogoFull />
        <Button as="a" href={`${env.API_URL}/api/auth/login`}>
          Login
        </Button>
      </Flex>
    </Box>
  );
};

export default LoginPage;
