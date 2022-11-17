import { connectAPI } from '../../../shared/api/connect';
import { TCoupons, TCouponsResponse } from '../lib/types';

export const couponsApi = connectAPI.injectEndpoints({
  endpoints: (build) => ({
    getAllCupons: build.query<TCouponsResponse, unknown>({
      query: (setting: string | undefined) => ({
        url: `coupons${setting}`,
        method: 'GET',
      }),
    }),
    getPromoCupons: build.query<TCouponsResponse, unknown>({
      query: () => ({
        url: `coupons/promoted`,
        method: 'GET',
      }),
    }),
    getCoupon: build.query<TCoupons, unknown>({
      query: (id: number) => ({
        url: `coupons/${id}`,
        method: 'GET',
      }),
    }),
  }),
});
