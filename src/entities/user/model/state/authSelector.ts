import { RootState } from 'app/store';

export const userSelector = (state: RootState) => state.authReducer.user;
