import { combineReducers } from '@reduxjs/toolkit';
import mainSlice from './mainSlice';
import CarForm from '../features/onboarding/components/CarForm/slice';
import AuthSlice from '../features/Auth/slice';

export const rootReducer = combineReducers({
  mainInfo: mainSlice,
  auth: AuthSlice,
  userProfile: CarForm,
});
