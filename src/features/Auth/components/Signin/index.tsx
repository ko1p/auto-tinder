import styles from './style.module.scss';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import Wrapper from '../../../../ui-library/components/Wrapper';
import { formOptions } from './Validation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { fetchUserAuth } from '../../API';
import { resetErrorText } from '../../slice';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks/redux';
import Alert from '@mui/material/Alert';
import { SigninInputs } from '../../types';

const Signin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninInputs>(formOptions);

  const dispatch = useAppDispatch();
  const { errorText } = useAppSelector(state => state.auth);

  const onSubmit: SubmitHandler<SigninInputs> = data => {
    dispatch(fetchUserAuth(data));
  };

  return (
    <Wrapper component='main' xs={12} sm={10} md={8} lg={6} xl={4}>
      <Box p={5}>
        <Typography classes={{ root: styles.title }} variant='h5' component='h1'>
          Вход в аккаунт:
        </Typography>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <TextField
            className={styles.field}
            label='Email'
            type='email'
            error={!!errors.email}
            helperText={errors.email?.message}
            inputMode='email'
            fullWidth
            {...register('email')}
          />
          <TextField
            className={styles.field}
            label='Пароль'
            type='password'
            error={!!errors.password}
            helperText={errors.password?.message}
            inputMode='text'
            fullWidth
            {...register('password')}
          />
          {errorText && <Alert severity='error'>{errorText}</Alert>}
          <Button
            className={styles.button}
            type='submit'
            size='large'
            variant='contained'
            fullWidth
          >
            Продолжить
          </Button>
        </form>
        <Box display='flex' justifyContent='center'>
          <Link to='/signup' className={styles.link}>
            <Typography
              onClick={() => dispatch(resetErrorText())}
              classes={{ root: styles.text }}
              variant='caption'
            >
              Регистрация
            </Typography>
          </Link>
        </Box>
      </Box>
    </Wrapper>
  );
};

export default Signin;
