import { combineReducers } from '@reduxjs/toolkit';
import mainSlice from './mainSlice';
import userAuthSlice from './userAuthSlice';
import CarForm from '../features/onboarding/components/CarForm/slice';

export const rootReducer = combineReducers({
  mainInfo: mainSlice,
  auth: userAuthSlice,
  userProfile: CarForm,
});
