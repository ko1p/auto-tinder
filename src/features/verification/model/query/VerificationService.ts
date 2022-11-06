import { connectAPI } from 'shared/api/connect';

export const verificationAPI = connectAPI.injectEndpoints({
  endpoints: (build) => ({
    verification: build.query<unknown, string>({
      query: (verificationToken) => ({
        url: `users/verification/${verificationToken}`,
        method: 'GET',
      }),
    }),
  }),
});
