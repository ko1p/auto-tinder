import './App.scss';
import Routing from './infrastructure/Routing';
import { useEffect } from 'react';
import { useAppDispatch } from './store/hooks/redux';
import { fetchUserInfo } from './features/Auth/API';

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchUserInfo());
  }, [dispatch]);
  return (
    <div className='app'>
      <Routing />
    </div>
  );
}

export default App;
