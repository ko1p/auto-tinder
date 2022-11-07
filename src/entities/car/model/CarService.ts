/* eslint-disable @typescript-eslint/no-unused-vars */

import { ICarProperty } from 'entities/car/lib/types';
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
  }),
});
