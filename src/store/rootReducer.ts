import { combineReducers } from '@reduxjs/toolkit';
import mainSlice from './mainSlice';
import userAuthSlice from './userAuthSlice';

export const rootReducer = combineReducers({
  mainInfo: mainSlice, // Вместо mainInfo придумать уже более адекватное название.
  auth: userAuthSlice,
});

// TODO: Решить где будут располагать файлы со слайсами, в фиче или где-то в отдельной папке в store.
