import { connectAPI } from '../../../shared/api/connect';
import { TCar, TCarsResponse } from '../lib';

export const carsAPI = connectAPI.injectEndpoints({
  endpoints: (build) => ({
    getTopCars: build.query<TCarsResponse, unknown>({
      query: () => ({
        url: `cars/promoted`,
        method: 'GET',
      }),
    }),
    getAllCars: build.query<TCarsResponse, unknown>({
      query: (setting: string | undefined) => ({
        url: `cars${setting}`,
        method: 'GET',
      }),
    }),
    toLike: build.mutation<{ like: boolean; isMatch: boolean }, unknown>({
      query: (ids: { likedCarId: number; likingCarId: number }) => ({
        url: `cars/${ids.likedCarId}/likes?liking_car_id=${ids.likingCarId}`,
        method: 'POST',
      }),
    }),
    toDislike: build.mutation<boolean, unknown>({
      query: (ids: { likedCarId: number; likingCarId: number }) => ({
        url: `cars/${ids.likedCarId}/dislikes?likingCarId=${ids.likingCarId}`,
        method: 'POST',
      }),
    }),
    getCarsDetails: build.query<TCar, unknown>({
      query: (id: number) => ({
        url: `cars/${id}`,
        method: 'GET',
      }),
    }),
  }),
});
