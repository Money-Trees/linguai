import { Box, Grid } from '@chakra-ui/react';
import { Role } from '@naite/types';
import LogoFull from '../components/LogoFull';
import { useAuthUser } from '../services/user.service';

const HomePage = (): JSX.Element => {
  const { data: user } = useAuthUser();

  if (user?.role !== Role.Admin) {
    return (
      <Grid width="100%" height="100%" placeItems="center">
        <LogoFull />
      </Grid>
    );
  }

  return <Box />;
};

export default HomePage;
