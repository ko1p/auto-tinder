import { createSlice } from '@reduxjs/toolkit';
import { MenuState } from './types';

const initialState: MenuState = {
  view: 'tinder',
};

export const MenuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    changeView(state) {
      state.view = state.view === 'tinder' ? 'list' : 'tinder';
    },
  },
  extraReducers: {},
});

export const { changeView } = MenuSlice.actions;
export default MenuSlice.reducer;
