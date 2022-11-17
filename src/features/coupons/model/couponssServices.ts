/* eslint-disable @typescript-eslint/no-unused-vars */

import { TCoupons, TCouponsResponse } from '../lib/types';

import { connectAPI } from '../../../shared/api/connect';

export const couponsApi = connectAPI.injectEndpoints({
  endpoints: (build) => ({
    getAllCupons: build.query<TCouponsResponse, unknown>({
      query: (setting: string | undefined) => ({
        url: `coupons${setting}`,
        method: 'GET',
      }),
      providesTags: (result) => ['coupons'],
    }),
    getCoupon: build.query<TCoupons, unknown>({
      query: (id: number) => ({
        url: `coupons/${id}`,
        method: 'GET',
      }),
      providesTags: (result) => ['coupons'],
    }),
  }),
});
