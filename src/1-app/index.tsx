import './App.scss';
import Routing from '../2-pages';
import { useEffect } from 'react';
import { useAppDispatch } from './store/hooks/redux';
import { fetchUserInfo } from '../4-features/Auth/API';
// import withProviders from './providers';

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
