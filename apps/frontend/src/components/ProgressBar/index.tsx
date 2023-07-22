import { ReactElement } from 'react';
import { Box } from '@chakra-ui/react';

interface Props {
  completed: number;
  showLabel?: boolean;
}

const ProgressBar = ({ completed, showLabel }: Props): ReactElement => {
  const containerStyles = {
    height: '20px',
    width: '100%',
    borderRadius: '50px',
  };

  const fillerStyles = {
    height: '100%',
    width: `${completed}%`,
    borderRadius: 'inherit',
  };

  const labelStyles = {
    padding: 5,
    color: 'white',
    fontWeight: 'bold',
  };

  return (
    <Box bg="gray.500" style={containerStyles}>
      <Box bg="primary.300" style={fillerStyles}>
        {showLabel && <span style={labelStyles}>{`${completed}%`}</span>}
      </Box>
    </Box>
  );
};

export default ProgressBar;
