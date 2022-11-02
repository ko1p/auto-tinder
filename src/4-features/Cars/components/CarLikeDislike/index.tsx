import styles from './style.module.scss';
import { Button, ButtonGroup } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownIcon from '@mui/icons-material/ThumbDownOutlined';

export const CarLikeDislike = () => {
  return (
    <ButtonGroup
      classes={{ root: styles.buttons }}
      fullWidth
      variant='contained'
      aria-label='оценка автомобиля'
    >
      <Button size='medium' color='error' startIcon={<ThumbDownIcon />}>
        Не нравится
      </Button>
      <Button size='medium' color='success' startIcon={<ThumbUpIcon />}>
        Нравится
      </Button>
    </ButtonGroup>
  );
};
