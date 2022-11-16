import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { IUserAuthResponse } from 'features/auth/lib';

const initialState: IUserAuthResponse = {
  accessToken: null,
  userId: null,
  isLogout: false,
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
  },
});

export const { logIn, logOut } = authSlice.actions;
export const authReducer = authSlice.reducer;
