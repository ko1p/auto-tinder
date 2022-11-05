import { IUserRegistrationRequest } from 'features/registation/lib';
import { connectAPI } from 'shared/api/connect';

export const registrationAPI = connectAPI.injectEndpoints({
  endpoints: (build) => ({
    registration: build.mutation<unknown, IUserRegistrationRequest>({
      query: (data) => ({
        url: 'users',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});
