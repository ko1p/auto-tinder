import { SignupInputs, SigninInputs } from '../types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../utils/axios';
import qs from 'qs';
import { AxiosError } from 'axios';

export const fetchUserRegistration = createAsyncThunk(
  'auth/fetchUserRegistration',
  async (formData: SignupInputs, thunkAPI) => {
    try {
      const res = await axios.post('/users', formData);
      return res.data;
    } catch (e) {
      const err = e as AxiosError;
      let msg;
      if (err.response) {
        switch (err.response.status) {
          case 409:
            msg = 'Указанный почтовый адрес уже зарегистрирован в системе';
            break;
          default:
            msg = 'При регистрации произошла ошибка';
        }
      }
      return thunkAPI.rejectWithValue(msg);
    }
  },
);

export const fetchUserAuth = createAsyncThunk(
  'auth/fetchUserAuth',
  async (data: SigninInputs, thunkAPI) => {
    try {
      const res = await axios.post('/auth/login', qs.stringify(data));

      return res.data;
    } catch (e) {
      const err = e as AxiosError;
      let msg;
      if (err.response) {
        switch (err.response.status) {
          case 404:
            msg = 'Указанный почтовый адрес в системе не зарегестрирован.';
            break;
          case 401:
            msg = 'Указана неверная пара логин/пароль.';
            break;
          default:
            msg = 'При входе произошла ошибка.';
        }
      }
      return thunkAPI.rejectWithValue(msg);
    }
  },
);

export const fetchUserInfo = createAsyncThunk('auth/fetchUserInfo', async (_, thunkAPI) => {
  const userId = localStorage.getItem('id');
  try {
    if (!userId) {
      throw 'Пользователь не авторизован.';
    }

    const res = await axios.get(`/users/${userId}`);

    return res.data;
  } catch (e) {
    const err = e as AxiosError;
    let msg;
    if (err.response) {
      localStorage.clear();
      msg = 'При авторизации произошла ошибка';
    }
    return thunkAPI.rejectWithValue(msg);
  }
});

export const fetchCofirmEmail = createAsyncThunk(
  'auth/fetchCofirmEmail',
  async (uuid: string, thunkAPI) => {
    try {
      const res = await axios.get(`/users/verify/${uuid}`);

      return res.data;
    } catch (e) {
      const err = e as AxiosError;
      let msg;
      if (err.response) {
        msg = 'При подтверждении почты произошла ошибка';
      }
      return thunkAPI.rejectWithValue(msg);
    }
  },
);

export const fetchUserLogout = createAsyncThunk('auth/fetchUserLogout', async (_, thunkAPI) => {
  try {
    const res = await axios.post('/auth/logout');

    return res.data;
  } catch (e) {
    const err = e as AxiosError;
    let msg;
    if (err.response) {
      msg = 'При выходе произошла ошибка';
    }
    return thunkAPI.rejectWithValue(msg);
  }
});
