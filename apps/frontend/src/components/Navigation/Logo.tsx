import { Flex, Icon } from '@chakra-ui/react';
import { ReactComponent as TLVIcon } from '../../../public/tlv-icon.svg';

const Logo = (): JSX.Element => {
  return (
    <Flex alignItems="center" height="24" paddingX="4" justifyContent="center">
      <Icon as={TLVIcon} boxSize="12" />
    </Flex>
  );
};

export default Logo;
