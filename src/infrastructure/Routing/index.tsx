import { Route, Routes } from 'react-router-dom';
import MainScreen from '../../screens/MainScreen';
import Registration from '../../screens/Registration';
import Profile from '../../screens/Profile';
import Onboarding from '../../screens/Onboarding';
import UserProfileForm from '../../features/UserProfileForm';

function Routing() {
  return (
    <Routes>
      <Route path='/' element={<MainScreen />} />
      <Route path='registration' element={<Registration />} />
      <Route path='profile' element={<Profile />} />
      <Route path='onboarding' element={<Onboarding />}>
        <Route path='user-profile-form' element={<UserProfileForm />} />
      </Route>
    </Routes>
  );
}

export default Routing;
