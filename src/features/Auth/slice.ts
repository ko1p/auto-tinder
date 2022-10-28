import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  fetchCofirmEmail,
  fetchUserAuth,
  fetchUserInfo,
  fetchUserLogout,
  fetchUserRegistration,
} from './API';
import { AuthState, UserRegistationResponse, UserAuthResponse, UserInfoResponse } from './types';

const initialState: AuthState = {
  isAuth: false,
  isAuthCheked: false,
  isRegisted: false,
  isEmailConfirmed: false,
  isOnboarded: false,
  isReqSent: false,
  id: '',
  name: null,
  email: '',
  phone: null,
  isLoading: false,
  errorText: null,
  isEmailConfirming: false,
};

export const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetErrorText(state) {
      state.errorText = null;
    },
    setIsOnboarded(state, action: PayloadAction<boolean>) {
      state.isOnboarded = action.payload;
    },
  },
  extraReducers: {
    [fetchUserRegistration.fulfilled.type]: (
      state,
      action: PayloadAction<UserRegistationResponse>,
    ) => {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.isRegisted = true;
      state.isLoading = false;
    },
    [fetchUserRegistration.pending.type]: state => {
      state.isLoading = true;
      state.errorText = null;
      state.isRegisted = false;
    },
    [fetchUserRegistration.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.errorText = action.payload;
      state.isRegisted = false;
    },
    [fetchUserAuth.fulfilled.type]: (state, action: PayloadAction<UserAuthResponse>) => {
      state.isAuth = true;
      state.isAuthCheked = true;
      state.id = action.payload.user.id;
      state.email = action.payload.user.email;
      state.name = action.payload.user.name;
      state.phone = action.payload.user.phone;
      state.isOnboarded = action.payload.user.isOnboarded;
      state.isLoading = false;
      localStorage.setItem('id', action.payload.user.id);
    },
    [fetchUserAuth.pending.type]: state => {
      state.isLoading = true;
      state.isAuthCheked = false;
      state.errorText = null;
      state.isReqSent = true;
    },
    [fetchUserAuth.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isAuth = false;
      state.isAuthCheked = true;
      state.isLoading = false;
      state.isReqSent = false;
      state.errorText = action.payload;
    },
    [fetchUserInfo.fulfilled.type]: (state, action: PayloadAction<UserInfoResponse>) => {
      state.isAuth = true;
      state.isAuthCheked = true;
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.phone = action.payload.phone;
      state.isLoading = false;
      state.isReqSent = true;
      localStorage.setItem('id', action.payload.id);
    },
    [fetchUserInfo.pending.type]: state => {
      state.isLoading = true;
      state.isAuthCheked = false;
      state.errorText = null;
    },
    [fetchUserInfo.rejected.type]: state => {
      state.isAuthCheked = true;
      state.isAuth = false;
      state.isLoading = false;
    },
    [fetchCofirmEmail.fulfilled.type]: state => {
      state.isEmailConfirming = false;
      state.isEmailConfirmed = true;
    },
    [fetchCofirmEmail.pending.type]: state => {
      state.isEmailConfirming = true;
      state.errorText = null;
      state.isEmailConfirmed = false;
    },
    [fetchCofirmEmail.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isEmailConfirming = false;
      state.errorText = action.payload;
      state.isEmailConfirmed = false;
    },
    [fetchUserLogout.fulfilled.type]: state => {
      state.isLoading = false;
      state.isAuth = false;
      state.id = '';
      state.email = '';
      state.name = null;
      state.phone = null;
      state.isLoading = false;
      state.isReqSent = false;
      localStorage.clear();
    },
    [fetchUserLogout.pending.type]: state => {
      state.isLoading = true;
      state.errorText = null;
      state.isEmailConfirmed = false;
      state.isReqSent = false;
    },
    [fetchUserLogout.rejected.type]: state => {
      state.isReqSent = false;
    },
  },
});

export const { resetErrorText } = AuthSlice.actions;
export default AuthSlice.reducer;
