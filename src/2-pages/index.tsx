import { Route, Routes } from 'react-router-dom';
import Onboarding from './Onboarding';
import SignupScreen from './Signup';
import SigninScreen from './Signin';
import Signup from '../4-features/Auth/components/Signup';
import Signin from '../4-features/Auth/components/Signin';
import AgreementScreen from './Agreement';
import Agreement from '../4-features/Auth/components/Agreement';
import Confirm from '../4-features/Auth/components/Confirm';
import RouteProtected from '../4-features/Auth/components/RouteProtected';
import SuccessSignup from '../4-features/Auth/components/SuccessSignup';
import {
  FiltersForm,
  CarFormStepOne,
  CarFormStepTwo,
  PhoneRequest,
} from '../4-features/onboarding/index';
import CarsScreen from './Cars';
import MyCarsScreen from './MyCars';
import ReportsScreen from './Reports';
import { Cars } from '../4-features/Cars/components/Cars';
import MyCars from '../4-features/Cars/components/MyCars';
import PromotionScreen from './Promotion';
import Promotion from '../4-features/Cars/components/Promotion';
import Reports from '../4-features/Cars/components/Reports';

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
