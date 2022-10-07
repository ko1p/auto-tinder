import { createSlice } from '@reduxjs/toolkit';

interface IMainState {
  value: number;
}

const initialState: IMainState = {
  value: 0,
};

export const mainSlice = createSlice({
  name: 'main',
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

export default mainSlice.reducer;
