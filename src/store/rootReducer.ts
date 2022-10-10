import { combineReducers } from '@reduxjs/toolkit';
import mainSlice from './mainSlice';
import userAuthSlice from './userAuthSlice';
import userProfile from '../features/UserProfileForm/slice';

export const rootReducer = combineReducers({
  mainInfo: mainSlice,
  auth: userAuthSlice,
  userProfile: userProfile, // Переименуй по вкусу
});
