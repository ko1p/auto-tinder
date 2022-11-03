import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { IUserState } from 'entities/user/lib/types';

const initialState: IUserState = {
  user: null,
  accessToken: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logIn: (state: IUserState, action: PayloadAction<IUserState>) => {
      const { user, accessToken } = action.payload;
      state.user = user;
      state.accessToken = accessToken;
    },
    logOut: (state: IUserState) => {
      state.user = null;
      state.accessToken = null;
    },
  },
});

export const { logIn, logOut } = authSlice.actions;
export const authReducer = authSlice.reducer;
