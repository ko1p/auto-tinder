import { connectAPI } from '../../../shared/api/connect';
import { TCarsResponse } from '../lib';

export const carsAPI = connectAPI.injectEndpoints({
  endpoints: (build) => ({
    getTopCars: build.query<TCarsResponse, unknown>({
      query: () => ({
        url: `cars/promoted`,
        method: 'GET',
      }),
    }),
    toLike: build.query<{ like: boolean; isMatch: boolean }, unknown>({
      query: (id) => ({
        url: `cars/${id}/likes`,
        method: 'GET',
      }),
    }),
    toDislike: build.query<boolean, unknown>({
      query: (id) => ({
        url: `cars/${id}/dislikes`,
        method: 'GET',
      }),
    }),
  }),
});
