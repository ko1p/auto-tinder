import styles from './style.module.scss';
import { Grid } from '@mui/material';
import { TinderView } from '../TinderView';
import { ListView } from '../ListView';
import { useAppSelector } from '../../../../store/hooks/redux';

export const Cars = () => {
  const { view } = useAppSelector(state => state.menu);

  return (
    <Grid container component='main' display='flex' justifyContent='center' alignItems='center'>
      <Grid classes={{ root: styles.container }} xs={12} sm={10} md={8} lg={6} xl={4} item>
        {view === 'tinder' ? <TinderView /> : <ListView />}
      </Grid>
    </Grid>
  );
};
