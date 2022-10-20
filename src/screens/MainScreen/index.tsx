import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { mainSlice } from '../../store/mainSlice';
import { useAppSelector, useAppDispatch } from '../../store/hooks/redux';
import { fetchUserLogout } from '../../features/Auth/API';
import Box from '@mui/material/Box';

export default function MainScreen() {
  const { increment, decrement } = mainSlice.actions;
  const { value: count } = useAppSelector(state => state.mainInfo);
  const dispatch = useAppDispatch();

  return (
    <div>
      <h1>Main screen</h1>
      <Box sx={{ display: 'grid', gridTemplateRows: 'repeat(3, 1fr)' }}>
        <Link to='/signup'>Зарегистрироваться</Link>
        <Link to='/signin'>Войти в аккаунт</Link>
        <Link to='/onboarding/user-phone-request'>На онбординг</Link>
      </Box>

      <div>
        <Button
          variant='contained'
          aria-label='Increment value'
          onClick={() => {
            dispatch(increment());
          }}
        >
          Increment
        </Button>
        <span>{count}</span>
        <Button
          variant='contained'
          aria-label='Decrement value'
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </Button>
        <Link to={'/'} />
      </div>
      <Box my={2}>
        <Button
          onClick={() => dispatch(fetchUserLogout())}
          type='button'
          size='large'
          variant='contained'
        >
          Выйти из аккаунат
        </Button>
      </Box>
    </div>
  );
}
