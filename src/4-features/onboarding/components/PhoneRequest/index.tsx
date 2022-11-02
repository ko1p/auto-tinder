import styles from './style.module.scss';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { InputAdornment, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { constructorErrorHelperText } from '../../../../6-shared/utils/validation';
import { useNavigate } from 'react-router-dom';
import { savePhone } from '../../api';

type FormValues = {
  phone: string;
};

export default function PhoneConfirmation() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ mode: 'onBlur' });

  const navigate = useNavigate();

  const rules = {
    required: true,
    minLength: { value: 10, message: 'Номер должен начинаться на +7 и содержать 11 цифр.' },
  };

  function onChangePhone(element: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
    let editableValue: string = element.target.value.replace(/[^\d]/g, '');
    editableValue = editableValue.length > 10 ? editableValue.slice(0, 10) : editableValue;
    element.target.value = editableValue;
  }

  function onSubmit(data: FormValues) {
    savePhone(data.phone).then(status => {
      if (status === 200) {
        navigate('/onboarding/user-car-form');
      } else {
        alert(`Что-то пошло не так, ошибка: ${status}`);
      }
    });
  }

  return (
    <div className={styles.root}>
      <div className={styles.userForm}>
        <Typography className={styles.title} variant='h1'>
          Телефон пользователя
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            className={styles.input}
            label='Телефон'
            fullWidth
            {...register('phone', rules)}
            error={!!errors?.phone}
            helperText={constructorErrorHelperText(errors, 'phone')}
            InputProps={{
              startAdornment: <InputAdornment position='start'>+7</InputAdornment>,
            }}
            onChange={onChangePhone}
          />
          <Button type='submit' size='large' variant='contained' fullWidth>
            Продолжить
          </Button>
        </form>
      </div>
    </div>
  );
}
