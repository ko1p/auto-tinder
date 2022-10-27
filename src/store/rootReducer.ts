import { combineReducers } from '@reduxjs/toolkit';
import CarFormStepOne from '../features/onboarding/slice';
import AuthSlice from '../features/Auth/slice';
import MenuSlice from '../features/Menu/slice';

export const rootReducer = combineReducers({
  auth: AuthSlice,
  userProfile: CarFormStepOne,
  menu: MenuSlice,
});
