/* eslint-disable @typescript-eslint/no-unused-vars */

import { ICar } from 'entities/car/lib/types';
import { ICarAddRequest } from 'features/garage/lib/typest';
import { connectAPI } from 'shared/api/connect';

export const garageAPI = connectAPI.injectEndpoints({
  endpoints: (build) => ({
    userCars: build.query<ICar[], string>({
      query: (userId) => ({
        url: `cars/users/${userId}`,
        method: 'GET',
      }),
      providesTags: (result) => ['garage'],
    }),
    addCar: build.mutation<unknown, ICarAddRequest>({
      query: (car) => ({
        url: `cars`,
        method: 'POST',
        data: car,
      }),
      invalidatesTags: ['garage', 'cars'],
    }),
  }),
});
