import { connectAPI } from 'shared/api';
import { IUserAuthRequest, IUserAuthResponse } from '../../lib/types';

export const authAPI = connectAPI.injectEndpoints({
  endpoints: (build) => ({
    logIn: build.mutation<IUserAuthResponse, IUserAuthRequest>({
      query: (data) => ({
        url: 'auth/login',
        method: 'POST',
        body: data,
      }),
    }),
    logOut: build.mutation({
      query: () => ({
        url: 'auth/logout',
        method: 'POST',
        body: '',
      }),
    }),
  }),
});
