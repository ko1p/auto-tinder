import styles from './style.module.scss';
import Button from '@mui/material/Button';
import ThumbUpIcon from '@mui/icons-material/ThumbUpOutlined';

export const OtherLikeLabel = () => (
  <Button
    classes={{ root: styles.label }}
    size='small'
    color='info'
    variant='contained'
    startIcon={<ThumbUpIcon />}
  >
    Кому-то
  </Button>
);
