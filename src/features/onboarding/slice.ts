import { ICarFormStepOne } from './utils/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Onboarding {
  carId: number | null;
  formCarStepOne: ICarFormStepOne | null;
}

const initialState: Onboarding = {
  formCarStepOne: null,
  carId: null,
};

export const userProfile = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {
    setCarFormStepOne: (state, action: PayloadAction<ICarFormStepOne>) => {
      state.formCarStepOne = action.payload;
    },
    setCarId: (state, action: PayloadAction<number>) => {
      state.carId = action.payload;
    },
  },
  extraReducers: {},
});

export const { setCarFormStepOne, setCarId } = userProfile.actions;
export default userProfile.reducer;
