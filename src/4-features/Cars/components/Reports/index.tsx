import { Box, Typography } from '@mui/material';
import Wrapper from '../../../../6-shared/components/Wrapper';

const Reports = () => (
  <Wrapper component='main' xs={12} sm={10} md={8} lg={6} xl={4}>
    <Box p={5}>
      <Typography component='h1' variant='h5'>
        Здесь будет страница с отчётами по автомобилям
      </Typography>
    </Box>
  </Wrapper>
);

export default Reports;
