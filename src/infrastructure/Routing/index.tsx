import { Route, Routes } from 'react-router-dom';
import Onboarding from '../../screens/Onboarding';
import SignupScreen from '../../screens/Signup';
import SigninScreen from '../../screens/Signin';
import Signup from '../../features/Auth/components/Signup';
import Signin from '../../features/Auth/components/Signin';
import AgreementScreen from '../../screens/Agreement';
import Agreement from '../../features/Auth/components/Agreement';
import Confirm from '../../features/Auth/components/Confirm';
import RouteProtected from '../../features/Auth/components/RouteProtected';
import SuccessSignup from '../../features/Auth/components/SuccessSignup';
import {
  FiltersForm,
  CarFormStepOne,
  CarFormStepTwo,
  PhoneRequest,
} from '../../features/onboarding/index';
import CarsScreen from '../../screens/Cars';
import MyCarsScreen from '../../screens/MyCars';
import ReportsScreen from '../../screens/Reports';
import { Cars } from '../../features/Cars/components/Cars';
import MyCars from '../../features/Cars/components/MyCars';
import PromotionScreen from '../../screens/Promotion';
import Promotion from '../../features/Cars/components/Promotion';
import Reports from '../../features/Cars/components/Reports';

function Routing() {
  return (
    <Routes>
      <Route path='/' element={<CarsScreen />}>
        <Route
          index
          element={
            <RouteProtected onlyAuth redirectPath='/signin'>
              <Cars />
            </RouteProtected>
          }
        />
      </Route>
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
      <Route path='my-cars' element={<MyCarsScreen />}>
        <Route
          index
          element={
            <RouteProtected onlyAuth redirectPath='/signin'>
              <MyCars />
            </RouteProtected>
          }
        />
      </Route>
      <Route path='promotion' element={<PromotionScreen />}>
        <Route
          index
          element={
            <RouteProtected onlyAuth redirectPath='/signin'>
              <Promotion />
            </RouteProtected>
          }
        />
      </Route>
      <Route path='reports' element={<ReportsScreen />}>
        <Route
          index
          element={
            <RouteProtected onlyAuth redirectPath='/signin'>
              <Reports />
            </RouteProtected>
          }
        />
      </Route>
      <Route path='onboarding' element={<Onboarding />}>
        <Route path='user-phone-request' element={<PhoneRequest />} />
        <Route path='user-car-form' element={<CarFormStepOne />} />
        <Route path='user-car-form-two' element={<CarFormStepTwo />} />
        <Route path='user-filter-form' element={<FiltersForm />} />
      </Route>
    </Routes>
  );
}

export default Routing;
