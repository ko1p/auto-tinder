import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { IUserAuthResponse } from 'features/auth/lib';

const initialState: IUserAuthResponse = {
  accessToken: null,
  userId: null,
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
    },
    logOut: (state: IUserAuthResponse) => {
      state.userId = null;
      state.accessToken = null;
    },
  },
});

export const { logIn, logOut } = authSlice.actions;
export const authReducer = authSlice.reducer;
