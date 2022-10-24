import { ICarFormStepOne } from './types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Onboarding {
  formCarStepOne: ICarFormStepOne | null;
}

const initialState: Onboarding = {
  formCarStepOne: null,
};

export const userProfile = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {
    setCarFormStepOne: (state, action: PayloadAction<ICarFormStepOne>) => {
      state.formCarStepOne = action.payload;
    },
  },
  extraReducers: {},
});

export const { setCarFormStepOne } = userProfile.actions;
export default userProfile.reducer;
