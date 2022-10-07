import { createSlice } from '@reduxjs/toolkit';

interface IAuth {
  login: string | null;
  phoneNumber: string | number | null;
  token: string | null;
}

const initialState: IAuth = {
  login: null,
  phoneNumber: null,
  token: null,
};

export const userAuth = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: {},
});

export default userAuth.reducer;
