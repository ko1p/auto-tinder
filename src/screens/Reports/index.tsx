import AppBar from '../../features/Menu/components/AppBar';
import { TabBar } from '../../features/Menu/components/TabBar';
import Wrapper from '../../ui-library/components/Wrapper';
import { Box, Typography } from '@mui/material';

const ReportsScreen = () => {
  return (
    <>
      <AppBar />
      <Wrapper component='main' xs={12} sm={10} md={8} lg={6} xl={4}>
        <Box p={5}>
          <Typography component='h1' variant='h5'>
            Здесь будет страница с отчётами по автомобилям
          </Typography>
        </Box>
      </Wrapper>
      <TabBar />
    </>
  );
};

export default ReportsScreen;
