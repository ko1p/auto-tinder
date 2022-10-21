import { Route, Routes } from 'react-router-dom';
import MainScreen from '../../screens/MainScreen';
import Registration from '../../screens/Registration';
import Profile from '../../screens/Profile';
import Onboarding from '../../screens/Onboarding';
import { PhoneRequest } from '../../features/onboarding';
import CarForm from '../../features/onboarding/components/CarForm';

function Routing() {
  return (
    <Routes>
      <Route path='/' element={<MainScreen />} />
      <Route path='registration' element={<Registration />} />
      <Route path='profile' element={<Profile />} />
      <Route path='onboarding' element={<Onboarding />}>
        <Route path='user-phone-request' element={<PhoneRequest />} />
        <Route path='user-car-form' element={<CarForm />} />
      </Route>
    </Routes>
  );
}

export default Routing;
