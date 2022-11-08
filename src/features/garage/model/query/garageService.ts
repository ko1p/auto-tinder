/* eslint-disable @typescript-eslint/no-unused-vars */

import { ICarAddRequest, ICarAddResponce } from 'features/garage/lib/typest';

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
    addFilter: build.mutation<ICarAddResponce, ICarAddRequest>({
      query: (carId) => ({
        url: `cars/${carId}/filter`,
        method: 'POST',
        body: '',
      }),
      invalidatesTags: ['filters'],
    }),
    patchFilter: build.mutation<ICarAddResponce, ICarAddRequest>({
      query: (carId) => ({
        url: `cars/${carId}/filter`,
        method: 'PATCH',
        body: '',
      }),
      invalidatesTags: ['filters'],
    }),
  }),
});
