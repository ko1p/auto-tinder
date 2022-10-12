import styles from './style.module.scss';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { constructorErrorHelperText } from '../../ultils/validation';

type FormValues = {
  firstName: string;
  lastName: string;
};

export default function UserForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ mode: 'onBlur' });

  const rules = {
    required: true,
    minLength: { value: 2, message: 'Поле должно содержать минимум 2 буквы.' },
    pattern: { value: /^[а-яА-Я]*$/, message: 'Допускаются только русские буквы.' },
  };

  function onSubmit(date: FormValues) {
    console.log(date);
    alert('yes');
  }
  return (
    <div className={styles.root}>
      <div className={styles.userForm}>
        <Typography className={styles.title} variant='h1'>
          Профиль пользователя
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            className={styles.input}
            label='Имя'
            fullWidth
            {...register('firstName', rules)}
            error={!!errors?.firstName}
            helperText={constructorErrorHelperText(errors, 'firstName')}
          />
          <TextField
            className={styles.input}
            label='Фамилия'
            fullWidth
            {...register('lastName', rules)}
            error={!!errors?.lastName}
            helperText={constructorErrorHelperText(errors, 'lastName')}
          />
          <Button type='submit' size='large' variant='contained' fullWidth>
            Продолжить
          </Button>
        </form>
      </div>
    </div>
  );
}
