import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { IUserAuthResponse } from 'features/auth/lib';

const initialState: IUserAuthResponse = {
  accessToken: null,
  userId: null,
  isLogout: false,
  isAdmin: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logIn: (
      state: IUserAuthResponse,
      action: PayloadAction<IUserAuthResponse>
    ) => {
      const { userId, accessToken } = action.payload;
      state.userId = userId;
      state.accessToken = accessToken;
      state.isLogout = false;
    },
    logOut: (state: IUserAuthResponse) => {
      state.userId = null;
      state.accessToken = null;
      state.isLogout = true;
    },
    adminActivation: (state: IUserAuthResponse) => {
      state.isAdmin = true;
    },
  },
});

export const { logIn, logOut, adminActivation } = authSlice.actions;
export const authReducer = authSlice.reducer;
