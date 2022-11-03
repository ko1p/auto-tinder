import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { authReducer } from 'entities/user/model/state/authSlice';
import { connectAPI } from 'shared/api';

const rootReducer = combineReducers({
  authReducer,
  [connectAPI.reducerPath]: connectAPI.reducer,
});

export const setupStore = () =>
  configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(connectAPI.middleware),
  });

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
