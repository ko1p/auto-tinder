/* eslint-disable @typescript-eslint/no-unused-vars */

import { connectAPI } from 'shared/api/connect';
import { ICoupon } from '../lib/types';

export const adminAPI = connectAPI.injectEndpoints({
  endpoints: (build) => ({
    userBan: build.mutation<unknown, unknown>({
      query: (userId) => ({
        url: `users/ban/${userId}`,
        method: 'PATCH',
      }),
    }),
    carBan: build.mutation<unknown, unknown>({
      query: (carId) => ({
        url: `cars/ban/${carId}`,
        method: 'PATCH',
      }),
    }),
    deleteCoupon: build.mutation<unknown, unknown>({
      query: (couponId) => ({
        url: `coupons/${couponId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['coupons'],
    }),
    patchCoupon: build.mutation<{ couponId: string; data: ICoupon }, unknown>({
      query: ({ couponId, data }) => ({
        url: `coupons/${couponId}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['coupons'],
    }),
    addPhotoCoupon: build.mutation<
      { couponId: string; data: ICoupon },
      unknown
    >({
      query: ({ couponId, data }) => ({
        url: `coupons/${couponId}/photos`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['coupons'],
    }),
    addCoupon: build.mutation<ICoupon, ICoupon>({
      query: (data) => ({
        url: 'coupons/',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['coupons'],
    }),
  }),
});
