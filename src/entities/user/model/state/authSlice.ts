import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { IUserState } from 'entities/user/lib/types';

const initialState: IUserState = {
  user: null,
  accessToken: null,
  role: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logIn: (state: IUserState, action: PayloadAction<IUserState>) => {
      const { user, accessToken, role } = action.payload;
      state.user = user;
      state.role = role;
      state.accessToken = accessToken;
    },
    logOut: (state: IUserState) => {
      state.user = null;
      state.role = null;
      state.accessToken = null;
    },
  },
});

export const { logIn, logOut } = authSlice.actions;
export const authReducer = authSlice.reducer;
