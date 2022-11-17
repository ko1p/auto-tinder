/* eslint-disable @typescript-eslint/no-unused-vars */

import { connectAPI } from 'shared/api/connect';
import { ICoupon } from '../lib/types';

export const adminAPI = connectAPI.injectEndpoints({
  endpoints: (build) => ({
    userBan: build.mutation<unknown, unknown>({
      query: (userId) => ({
        url: `users/ban/${userId}`,
        method: 'POST',
      }),
    }),
    carBan: build.mutation<unknown, unknown>({
      query: (carId) => ({
        url: `cars/ban/${carId}`,
        method: 'POST',
      }),
    }),
    deleteCoupon: build.mutation<unknown, unknown>({
      query: (couponId) => ({
        url: `coupons/${couponId}`,
        method: 'DELETE',
      }),
    }),
    patchCoupon: build.mutation<{ couponId: string; data: ICoupon }, unknown>({
      query: ({ couponId, data }) => ({
        url: `coupons/${couponId}`,
        method: 'PATCH',
        body: data,
      }),
    }),
    addPhotoCoupon: build.mutation<
      { couponId: string; data: ICoupon },
      unknown
    >({
      query: ({ couponId, data }) => ({
        url: `coupons/${couponId}/photos`,
        method: 'POST',
        body: data,
      }),
    }),
    addCoupon: build.mutation<ICoupon, ICoupon>({
      query: (data) => ({
        url: 'coupons/',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});
