import { Route, Routes } from 'react-router-dom';
import Profile from '../../screens/Profile';
import Onboarding from '../../screens/Onboarding';
import { PhoneRequest } from '../../features/onboarding';
import CarFormStepOne from '../../features/onboarding/components/CarFormStepOne';
import SignupScreen from '../../screens/Signup';
import SigninScreen from '../../screens/Signin';
import Signup from '../../features/Auth/components/Signup/';
import Signin from '../../features/Auth/components/Signin/';
import AgreementScreen from '../../screens/Agreement/';
import Agreement from '../../features/Auth/components/Agreement';
import Confirm from '../../features/Auth/components/Confirm/';
import RouteProtected from '../../features/Auth/components/RouteProtected';
import SuccessSignup from '../../features/Auth/components/SuccessSignup';
import CarFormStepTwo from '../../features/onboarding/components/CarFormStepTwo';
import CarsScreen from '../../screens/Cars';

function Routing() {
  return (
    <Routes>
      <Route path='/' element={<CarsScreen />} />
      <Route path='profile' element={<Profile />} />
      <Route path='signup' element={<SignupScreen />}>
        <Route
          index
          element={
            <RouteProtected onlyUnAuth redirectPath='/'>
              <Signup />
            </RouteProtected>
          }
        />
      </Route>
      <Route path='signin' element={<SigninScreen />}>
        <Route
          index
          element={
            <RouteProtected onlyUnAuth redirectPath='/'>
              <Signin />
            </RouteProtected>
          }
        />
      </Route>
      <Route path='agreements' element={<AgreementScreen />}>
        <Route
          index
          element={
            <RouteProtected onlyUnAuth redirectPath='/'>
              <Agreement />
            </RouteProtected>
          }
        />
      </Route>
      <Route path='confirm'>
        <Route index element={<SuccessSignup />} />
        <Route path=':uuid' element={<Confirm />} />
      </Route>
      <Route path='onboarding' element={<Onboarding />}>
        <Route path='user-phone-request' element={<PhoneRequest />} />
        <Route path='user-car-form' element={<CarFormStepOne />} />
        <Route path='user-car-form-two' element={<CarFormStepTwo />} />
      </Route>
    </Routes>
  );
}

export default Routing;
