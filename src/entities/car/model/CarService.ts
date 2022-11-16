/* eslint-disable @typescript-eslint/no-unused-vars */

import { ICar, ICarPatch, ICarProperty } from 'entities/car/lib/types';

import { ICarAddPhotoRequest } from 'features/garage/lib/types';
import { connectAPI } from 'shared/api/connect';

export const carAPI = connectAPI.injectEndpoints({
  endpoints: (build) => ({
    carBrands: build.query<ICarProperty[], unknown>({
      query: () => ({
        url: 'cars/brands',
        method: 'GET',
      }),
    }),
    carModels: build.query<ICarProperty[], unknown>({
      query: (brandId) => ({
        url: `cars/brands/${brandId}/models`,
        method: 'GET',
      }),
    }),
    carBodies: build.query<ICarProperty[], unknown>({
      query: () => ({
        url: 'cars/bodies',
        method: 'GET',
      }),
    }),
    carCities: build.query<ICarProperty[], unknown>({
      query: () => ({
        url: 'cars/cities',
        method: 'GET',
      }),
    }),
    carDrives: build.query<ICarProperty[], unknown>({
      query: () => ({
        url: 'cars/drives',
        method: 'GET',
      }),
    }),
    carEngines: build.query<ICarProperty[], unknown>({
      query: () => ({
        url: 'cars/engines',
        method: 'GET',
      }),
    }),
    carGearBoxes: build.query<ICarProperty[], unknown>({
      query: () => ({
        url: 'cars/gearboxes',
        method: 'GET',
      }),
    }),
    userCarInfo: build.query<ICar, string>({
      query: (carId) => ({
        url: `cars/${carId}`,
        method: 'GET',
      }),
      providesTags: (result) => ['cars'],
    }),
    addPhoto: build.mutation<unknown, ICarAddPhotoRequest>({
      query: ({ carId, data }) => ({
        url: `cars/${carId}/photos`,
        method: 'POST',
        body: data,
        headers: {
          'Content-Type': undefined,
        },
      }),
      invalidatesTags: ['garage', 'cars'],
    }),
    patchUserCarInfo: build.mutation<
      unknown,
      { carId: string; data: ICarPatch }
    >({
      query: ({ carId, data }) => ({
        url: `cars/${carId}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['garage', 'cars'],
    }),
  }),
});
