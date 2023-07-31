import { Flex, Icon } from '@chakra-ui/react';
import { ReactComponent as DialoqIcon } from '../../../public/dialoq-icon.svg';

const Logo = (): JSX.Element => {
  return (
    <Flex alignItems="center" height="24" paddingX="4" justifyContent="center">
      <Icon as={DialoqIcon} boxSize="12" />
    </Flex>
  );
};

export default Logo;
