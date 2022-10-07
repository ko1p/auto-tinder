import { Route, Routes } from 'react-router-dom';
import './App.scss';
import MainScreen from './screens/MainScreen';
import Registration from './screens/Registration';
import Profile from './screens/Profile';

function App() {
  return (
    <div className='app'>
      <Routes>
        <Route path='/' element={<MainScreen />} />
        <Route path='/registration' element={<Registration />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
