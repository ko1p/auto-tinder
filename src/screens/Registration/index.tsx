import styles from './style.module.scss';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import RegistrationCard from '../../components/RegistrationCard';

export default function Registration() {
  const cardContent: React.ReactNode = (
    <>
      <Typography classes={{ root: styles.title }} variant='h5'>
        Создание аккаунта
      </Typography>
      <form>
        <TextField className={styles.field} label='Полное имя' fullWidth />
        <TextField className={styles.field} label='E-Mail' fullWidth />
        <TextField
          className={styles.field}
          label='Номер телефона'
          type='tel'
          error={true}
          helperText={'Текст ошибки'}
          fullWidth
        />
        <TextField className={styles.field} label='Пароль' type='password' fullWidth />
        <Button type='submit' size='large' variant='contained' fullWidth>
          Зарегистрироваться
        </Button>
        <Typography variant='body1'>
          Body1 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid eaque inventore
          ipsum minus sed voluptatum. Commodi cupiditate dolores esse excepturi explicabo illum
          minus odio praesentium, quam. A ad animi aspernatur autem consectetur debitis dolorum
          ducimus earum?
        </Typography>
        <Typography variant='body2'>
          Body2 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid eaque inventore
          ipsum minus sed voluptatum. Commodi cupiditate dolores esse excepturi explicabo illum
          minus odio praesentium, quam. A ad animi aspernatur autem consectetur debitis dolorum
          ducimus earum?
        </Typography>
      </form>
    </>
  );

  return (
    <div className={styles.root}>
      <RegistrationCard card={cardContent} />
    </div>
  );
}
