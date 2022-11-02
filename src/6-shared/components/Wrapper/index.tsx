import { FC } from 'react';
import styles from './style.module.scss';
import Grid from '@mui/material/Grid';
import { WrapperProps } from './types';

export const Wrapper: FC<WrapperProps> = ({ children, component, xs, sm, md, lg, xl }) => (
  <Grid container component={component || 'div'}>
    <Grid classes={{ root: styles.root }} xs={xs} sm={sm} md={md} lg={lg} xl={xl} item>
      {children}
    </Grid>
  </Grid>
);

export default Wrapper;
