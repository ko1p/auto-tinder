import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { IUserAuthResponse } from 'features/auth/lib';

const initialState: IUserAuthResponse = {
  accessToken: null,
  user: {
    id: null,
    name: null,
    email: null,
    phone: null,
    isOnboarded: null,
  },
  hasPhone: null,
  hasCar: null,
  hasPreference: null,
  // role: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logIn: (
      state: IUserAuthResponse,
      action: PayloadAction<IUserAuthResponse>
    ) => {
      const { user, accessToken, hasPhone, hasCar, hasPreference } =
        action.payload;
      state.user = user;
      // state.role = role;
      state.accessToken = accessToken;
      state.hasPhone = hasPhone;
      state.hasCar = hasCar;
      state.hasPreference = hasPreference;
    },
    logOut: (state: IUserAuthResponse) => {
      state.user = {
        id: null,
        name: null,
        email: null,
        phone: null,
        isOnboarded: null,
      };
      // state.role = null;
      state.accessToken = null;
      state.hasPhone = null;
      state.hasCar = null;
      state.hasPreference = null;
    },
  },
});

export const { logIn, logOut } = authSlice.actions;
export const authReducer = authSlice.reducer;
