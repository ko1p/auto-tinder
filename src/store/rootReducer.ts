import { combineReducers } from '@reduxjs/toolkit';
import mainSlice from './mainSlice';
import userProfile from '../features/UserProfileForm/slice';
import AuthSlice from '../features/Auth/slice';

export const rootReducer = combineReducers({
  mainInfo: mainSlice,
  auth: AuthSlice,
  userProfile: userProfile,
});
