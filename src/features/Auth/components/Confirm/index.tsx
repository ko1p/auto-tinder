import styles from './style.module.scss';
import { useParams, Link } from 'react-router-dom';
import Wrapper from '../../../../ui-library/components/Wrapper';
import Typography from '@mui/material/Typography';
import { CircularProgress } from '@mui/material';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks/redux';
import { useEffect } from 'react';
import { fetchCofirmEmail } from '../../API';

const Confirm = () => {
  const { uuid } = useParams();
  const { isLoading, isEmailConfirmed, errorText } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    uuid && dispatch(fetchCofirmEmail(uuid));
  }, [uuid]);
  return (
    <Wrapper component='main' xs={12} sm={10} md={8} lg={6} xl={4}>
      <Box p={5} display='flex' flexDirection='column' alignItems='center'>
        <Typography classes={{ root: styles.title }} variant='h5' component='h1'>
          Подтверждение почтового ящика:
        </Typography>
        {isLoading && <CircularProgress />}
        {!isLoading && isEmailConfirmed && (
          <Alert severity='success'>Почтовый ящик успешно подтвержден.</Alert>
        )}
        {!isLoading && !isEmailConfirmed && errorText && (
          <Alert severity='error'>При подтверждении почты произошла ошибка.</Alert>
        )}
        {!isLoading && isEmailConfirmed && !errorText && (
          <Link to='/signin' className={styles.link}>
            <Typography classes={{ root: styles.text }} variant='caption'>
              Войти в аккаунт
            </Typography>
          </Link>
        )}
      </Box>
    </Wrapper>
  );
};

export default Confirm;
