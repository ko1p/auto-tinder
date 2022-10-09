import styles from './style.module.scss';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { mainSlice } from '../../store/mainSlice';
import { useAppSelector, useAppDispatch } from '../../store/hooks/redux';

export default function MainScreen() {
  const { increment, decrement } = mainSlice.actions; // Предлагаю импортировать экшены таким образом, чтобы при масштабировании не приходилось делать лишние импорты в самих слайсах.
  const { value: count } = useAppSelector(state => state.mainInfo);
  const dispatch = useAppDispatch();

  return (
    <div>
      <h1>Main screen</h1>
      <Link to='/registration'>Зарегистрироваться</Link>
      <Link to='/profile'>Профиль</Link>
      <Link to='/user-form'>На онбординг</Link>

      <div>
        <Button
          variant='contained'
          aria-label='Increment value'
          onClick={() => dispatch(increment())}
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
    </div>
  );
}
