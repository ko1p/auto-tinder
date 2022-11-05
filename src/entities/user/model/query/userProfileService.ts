/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  IUserProfilePatchRequest,
  IUserProfileResponse,
} from 'entities/user/lib/types';

import { connectAPI } from 'shared/api/connect';

export const userAPI = connectAPI.injectEndpoints({
  endpoints: (build) => ({
    userProfile: build.query<IUserProfileResponse, string>({
      query: (userId) => ({
        url: `users/${userId}`,
        method: 'GET',
      }),
      providesTags: (result) => ['userProfile'],
    }),
    userProfilePatch: build.mutation<
      IUserProfileResponse,
      IUserProfilePatchRequest
    >({
      query: ({ data, userId }) => ({
        url: `users/${userId}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['userProfile'],
    }),
  }),
});
