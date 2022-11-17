import { RootState } from 'app/store';

export const userSelector = (state: RootState) => state.auth.userId;
export const isLogoutSelector = (state: RootState) => state.auth.isLogout;
export const accessTokenSelector = (state: RootState) => state.auth.accessToken;
export const isAdminSelector = (state: RootState) => state.auth.isAdmin;
