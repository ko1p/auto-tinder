import {
  IUserForgotRequest,
  IUserResetPasswordRequest,
} from 'features/forgot/lib/types';

import { connectAPI } from 'shared/api/connect';

export const forgotAPI = connectAPI.injectEndpoints({
  endpoints: (build) => ({
    forgotPassword: build.mutation<unknown, IUserForgotRequest>({
      query: ({ email }) => ({
        url: `users/forgot-password?email=${email}`,
        method: 'POST',
      }),
    }),
    resetPassword: build.mutation<unknown, IUserResetPasswordRequest>({
      query: (data) => ({
        url: `users/reset-password`,
        method: 'PATCH',
        body: data,
      }),
    }),
  }),
});
