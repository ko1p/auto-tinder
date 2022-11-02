import styles from './style.module.scss';
import Button from '@mui/material/Button';
import ThumbUpIcon from '@mui/icons-material/ThumbUpOutlined';

export const YourLikeLabel = () => (
  <Button
    classes={{ root: styles.label }}
    size='small'
    color='success'
    variant='contained'
    startIcon={<ThumbUpIcon />}
  >
    Вам
  </Button>
);
