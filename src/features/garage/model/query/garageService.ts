/* eslint-disable @typescript-eslint/no-unused-vars */

import { ICarAddRequest, ICarAddResponce } from 'features/garage/lib/types';

import { ICar } from 'entities/car/lib/types';
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
    addCar: build.mutation<ICarAddResponce, ICarAddRequest>({
      query: (car) => ({
        url: 'cars',
        method: 'POST',
        body: car,
      }),
      invalidatesTags: ['garage', 'cars'],
    }),
  }),
});
