import styles from './style.module.scss';
import Button from '@mui/material/Button';
import AutorenewIcon from '@mui/icons-material/AutorenewOutlined';

export const ReadyToSwapLabel = () => (
  <Button
    classes={{ root: styles.label }}
    size='small'
    color='warning'
    variant='contained'
    startIcon={<AutorenewIcon />}
  >
    Обмен
  </Button>
);
