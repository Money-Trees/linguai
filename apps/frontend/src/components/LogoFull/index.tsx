import { Box, BoxProps, Image, useColorMode } from '@chakra-ui/react';
import LogoDark from '../../../public/dialoq-logo-full-dark.png';
import LogoLight from '../../../public/dialoq-logo-full-light.png';

const LogoFull = (props: BoxProps): JSX.Element => {
  const { colorMode } = useColorMode();
  const image = colorMode === 'dark' ? LogoLight : LogoDark;

  return (
    <Box width="200px" {...props}>
      <Image src={image} alt="Dialoq" />
    </Box>
  );
};

export default LogoFull;
