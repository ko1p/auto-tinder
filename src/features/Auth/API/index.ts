import { SignupInputs, SigninInputs } from '../types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../utils/axios';
import qs from 'qs';
import { AxiosError } from 'axios';

export const fetchUserRegistration = createAsyncThunk(
  'auth/fetchUserRegistration',
  async (formData: SignupInputs, thunkAPI) => {
    try {
      const { data } = await axios.post('/users', formData);
      return data;
    } catch (e) {
      const error = e as AxiosError;
      let messageText: string | undefined;
      if (error.response) {
        switch (error.response.status) {
          case 409:
            messageText = 'Указанный почтовый адрес уже зарегистрирован в системе';
            break;
          default:
            messageText = 'При регистрации произошла ошибка';
        }
      }
      return thunkAPI.rejectWithValue(messageText);
    }
  },
);

export const fetchUserAuth = createAsyncThunk(
  'auth/fetchUserAuth',
  async (info: SigninInputs, thunkAPI) => {
    try {
      const { data } = await axios.post('/auth/login', qs.stringify(info));
      return data;
    } catch (e) {
      const error = e as AxiosError;
      let messageText: string | undefined;
      if (error.response) {
        switch (error.response.status) {
          case 404:
            messageText = 'Указанный почтовый адрес в системе не зарегестрирован.';
            break;
          case 401:
            messageText = 'Указана неверная пара логин/пароль.';
            break;
          default:
            messageText = 'При входе произошла ошибка.';
        }
      }
      return thunkAPI.rejectWithValue(messageText);
    }
  },
);

export const fetchUserInfo = createAsyncThunk('auth/fetchUserInfo', async (_, thunkAPI) => {
  const userId = localStorage.getItem('id');
  try {
    if (!userId) {
      throw new Error('Пользователь не авторизован.');
    }
    const { data } = await axios.get(`/users/${userId}`);

    return data;
  } catch (e) {
    const error = e as AxiosError;
    let messageText: string | undefined;
    if (error.response) {
      localStorage.clear();
      messageText = 'При авторизации произошла ошибка';
    }
    return thunkAPI.rejectWithValue(messageText);
  }
});

export const fetchCofirmEmail = createAsyncThunk(
  'auth/fetchCofirmEmail',
  async (uuid: string, thunkAPI) => {
    try {
      const { data } = await axios.get(`/users/verify/${uuid}`);

      return data;
    } catch (e) {
      const error = e as AxiosError;
      let messageText: string | undefined;
      if (error.response) {
        switch (error.response.status) {
          case 404:
            messageText = 'Ссылка устарела или недействительна';
            break;
          default:
            messageText = 'При подтверждении почты произошла ошибка';
        }
      }
      return thunkAPI.rejectWithValue(messageText);
    }
  },
);

export const fetchUserLogout = createAsyncThunk('auth/fetchUserLogout', async (_, thunkAPI) => {
  try {
    const { data } = await axios.post('/auth/logout');

    return data;
  } catch (e) {
    const error = e as AxiosError;
    let messageText: string | undefined;
    if (error.response) {
      messageText = 'При выходе произошла ошибка';
    }
    return thunkAPI.rejectWithValue(messageText);
  }
});
