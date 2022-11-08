import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

import { RootState } from 'app/store';

// import { logIn, logOut } from 'entities/user/model/state/authSlice';

const baseUrl = 'https://auto-tindr.herokuapp.com';

const baseQuery = fetchBaseQuery({
  baseUrl,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const { accessToken } = (getState() as RootState).auth;
    if (accessToken) {
      headers.set('Authorization', `Bearer ${accessToken}`);
    }
    return headers;
  },
});

// const baseQueryWithReauth: BaseQueryFn<
//   string | FetchArgs,
//   unknown,
//   FetchBaseQueryError
// > = async (args, api, extraOptions) => {
//   let result = await baseQuery(args, api, extraOptions);

//   if (result?.error?.status === 400) {
//     const refreshResult = await baseQuery('/auth/refresh', api, extraOptions);
//     if (refreshResult?.data) {
//       api.dispatch(logIn({ accessToken: refreshResult.data as string }));
//       result = await baseQuery(args, api, extraOptions);
//     } else {
//       api.dispatch(logOut());
//     }
//   }
//   return result;
// };

export const connectAPI = createApi({
  reducerPath: 'connectAPI',
  tagTypes: ['userProfile', 'garage', 'cars', 'model', 'filters'],
  baseQuery,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  endpoints: (build) => ({}),
});
