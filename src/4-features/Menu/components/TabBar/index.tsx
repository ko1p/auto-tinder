import styles from './style.module.scss';
import Grid from '@mui/material/Grid';
import { Button, ButtonGroup } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FilterListIcon from '@mui/icons-material/FilterList';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import { useAppDispatch } from '../../../../1-app/store/hooks/redux';
import { changeView } from '../../slice';

export const TabBar = () => {
  const dispatch = useAppDispatch();

  const viewHandler = () => {
    dispatch(changeView());
  };

  return (
    <div className={styles.tabBar}>
      <Grid container component='footer' justifyContent='center'>
        <Grid classes={{ root: styles.root }} xs={12} sm={10} md={8} lg={6} xl={4} item>
          <ButtonGroup
            classes={{ root: styles.buttons }}
            fullWidth
            aria-label='оценка автомобиля'
            variant='contained'
          >
            <Button
              onClick={viewHandler}
              size='large'
              color='error'
              startIcon={<PublishedWithChangesIcon />}
            >
              Вид
            </Button>
            <Button size='large' color='success' startIcon={<FavoriteBorderIcon />}>
              Лайки
            </Button>
            <Button size='large' color='success' startIcon={<FilterListIcon />}>
              Фильтр
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>
    </div>
  );
};
