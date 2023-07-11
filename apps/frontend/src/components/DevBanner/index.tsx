import { Box } from '@chakra-ui/react';

export const BANNER_HEIGHT = 8;

const DevBanner = (): JSX.Element => (
  <Box
    height={BANNER_HEIGHT}
    width="100vw"
    display="flex"
    justifyContent="center"
    alignItems="center"
    fontWeight="bold"
    zIndex="banner"
    position={{ base: 'fixed', md: 'relative' }}
    backgroundColor="primary.500"
    _dark={{ backgroundColor: 'primary.600' }}
    fontSize="sm"
    boxShadow="base"
  >
    DEV-Environment
  </Box>
);

export default DevBanner;
