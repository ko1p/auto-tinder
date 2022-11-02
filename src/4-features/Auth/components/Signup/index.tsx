import styles from './style.module.scss';
import { useAppDispatch, useAppSelector } from '../../../../1-app/store/hooks/redux';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { fetchUserRegistration } from '../../API';
import { resetErrorText } from '../../slice';
import { SignupInputs } from '../../types';
import { Navigate } from 'react-router';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { formSchema } from './Validation';
import Wrapper from '../../../../6-shared/components/Wrapper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupInputs>({
    resolver: yupResolver(formSchema),
    shouldUseNativeValidation: false,
    reValidateMode: 'onChange',
  });

  const dispatch = useAppDispatch();
  const { errorText, isLoading, isRegisted } = useAppSelector(state => state.auth);

  const onSubmit: SubmitHandler<SignupInputs> = data => {
    dispatch(fetchUserRegistration(data));
  };

  if (isRegisted) {
    return <Navigate replace to='/confirm' />;
  }

  return (
    <Wrapper component='main' xs={12} sm={10} md={8} lg={6} xl={4}>
      <Box p={5}>
        <Typography classes={{ root: styles.title }} variant='h5' component='h1'>
          Регистрация нового пользователя:
        </Typography>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
          <TextField
            className={styles.field}
            label='Имя'
            type='name'
            error={!!errors.name}
            helperText={errors.name?.message}
            inputMode='text'
            fullWidth
            {...register('name')}
          />
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
          <TextField
            className={styles.field}
            label='Повторите пароль'
            type='password'
            error={!!errors.confirmPwd}
            helperText={errors.confirmPwd?.message}
            inputMode='text'
            fullWidth
            {...register('confirmPwd')}
          />
          {errorText && <Alert severity='error'>{errorText}</Alert>}
          <Link to='/agreements' className={styles.agreementLink}>
            <Typography
              onClick={() => dispatch(resetErrorText())}
              className={styles.agreement}
              align='center'
              variant='body2'
            >
              Нажимая кнопку &quot;Продолжить&quot; вы соглашаетесь на обработку персональных данных
              в соответствии с политикой конфиденциальности, соглашаетесь с пользовательским
              соглашением.
            </Typography>
          </Link>
          <Button
            className={styles.button}
            type='submit'
            size='large'
            variant='contained'
            fullWidth
            disabled={isLoading}
          >
            Продолжить
          </Button>
        </form>
        <Box display='flex' justifyContent='center'>
          <Link to='/signin' className={styles.link}>
            <Typography
              onClick={() => dispatch(resetErrorText())}
              classes={{ root: styles.text }}
              variant='caption'
            >
              Войти
            </Typography>
          </Link>
        </Box>
      </Box>
    </Wrapper>
  );
};

export default Signup;
