import { combineReducers } from '@reduxjs/toolkit';
import CarFormStepOne from '4-features/onboarding/slice';
import AuthSlice from '4-features/Auth/slice';
import MenuSlice from '4-features/Menu/slice';

export const rootReducer = combineReducers({
  auth: AuthSlice,
  userProfile: CarFormStepOne,
  menu: MenuSlice,
});
