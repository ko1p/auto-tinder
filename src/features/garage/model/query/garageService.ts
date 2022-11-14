/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  ICarAddPhotoRequest,
  ICarAddRequest,
  ICarAddResponce,
  IFilter,
} from 'features/garage/lib/types';

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
    addFilter: build.mutation<unknown, { carId: number; filter: IFilter }>({
      query: ({ carId, filter }) => ({
        url: `cars/${carId}/filters`,
        method: 'POST',
        body: filter,
      }),
      invalidatesTags: ['filters'],
    }),
    patchFilter: build.mutation<ICarAddResponce, ICarAddRequest>({
      query: (carId) => ({
        url: `cars/${carId}/filters`,
        method: 'PATCH',
        body: '',
      }),
      invalidatesTags: ['filters'],
    }),
  }),
});
