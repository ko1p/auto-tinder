import { Box, Typography } from '@mui/material';
import Wrapper from '../../../../ui-library/components/Wrapper';

const Promotion = () => (
  <Wrapper component='main' xs={12} sm={10} md={8} lg={6} xl={4}>
    <Box p={5}>
      <Typography component='h1' variant='h5'>
        Здесь будет страница с информацией о продвижении авто
      </Typography>
    </Box>
  </Wrapper>
);

export default Promotion;
