import styles from './style.module.scss';
// import { Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { Autocomplete, Typography } from '@mui/material';

interface Citylabel {
  label: string;
}

export default function UserForm() {
  const cities: Array<Citylabel> = [
    { label: 'Москва' },
    { label: 'Самара' },
    { label: 'Томск' },
    { label: 'Астрахань' },
    { label: 'Якутск' },
    { label: 'Зеленоград' },
    { label: 'Норильск' },
    { label: 'Киров' },
    { label: 'Борск' },
  ];

  return (
    <main>
      <div className={styles.root}>
        <div className={styles.userForm}>
          <Typography className={styles.title} variant='h5'>
            Профиль пользователя
          </Typography>
          <TextField className={styles.input} label='Имя' fullWidth />
          <TextField className={styles.input} label='Фамилия' fullWidth />
          <Autocomplete
            className={styles.input}
            disablePortal
            id='combo-box-demo'
            options={cities}
            renderInput={params => <TextField {...params} label='Город' />}
          />
          <Button type='submit' size='large' variant='contained' fullWidth>
            Продолжить
          </Button>
        </div>
      </div>
    </main>
  );
}
