import { ReactNode } from 'react';
import styles from './style.module.scss';
import Grid from '@mui/material/Grid';

interface WrapperProps {
  children: ReactNode;
  component?: 'header' | 'main' | 'footer' | 'aside' | 'section' | 'article';
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
}

export const Wrapper: React.FC<WrapperProps> = ({ children, component, xs, sm, md, lg, xl }) => (
  <Grid container component={component || 'div'}>
    <Grid classes={{ root: styles.root }} xs={xs} sm={sm} md={md} lg={lg} xl={xl} item>
      {children}
    </Grid>
  </Grid>
);

export default Wrapper;
