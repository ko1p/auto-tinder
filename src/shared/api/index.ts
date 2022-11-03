import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { logIn, logOut } from 'entities/user/model/state/authSlice';

const baseUrl = 'https://auto-tindr.herokuapp.com';

const baseQuery = fetchBaseQuery({
  baseUrl,
  // prepareHeaders: (headers, { getState }: any) => {
  //   const { accessToken } = getState().auth;
  //   if (accessToken) {
  //     headers.set('Authorization', `Bearer ${accessToken}`);
  //   }
  //   return headers;
  // },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result?.error?.originalStatus === 403) {
    const refreshResult = await baseQuery('/auth/refresh', api, extraOptions);
    if (refreshResult?.data) {
      const { user } = api.getState().auth;
      api.dispatch(logIn({ ...refreshResult.data, user }));
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
    }
  }
  return result;
};

export const connectAPI = createApi({
  reducerPath: 'connectAPI',
  baseQuery: baseQueryWithReauth,
  endpoints: build => ({}),
});
