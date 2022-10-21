import { createSlice } from '@reduxjs/toolkit';

interface IUserProfileState {
  value: number;
}

const initialState: IUserProfileState = {
  value: 0,
};

export const userProfile = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {
    increment: state => {
      state.value += 1;
    },
    decrement: state => {
      state.value -= 1;
    },
  },
  extraReducers: {},
});

export default userProfile.reducer;
