import { IFilter } from 'entities/car/lib/types';

export interface ICarAddRequest {
  userId: string;
  vinCode: string;
  stateNumber: string;
  manufacturedAt: number;
  totalOwners: number;
  description: string;
  mileage: number;
  price: number;
  isExchanged: boolean;
  isPromoted: boolean;
  body: number;
  engine: number;
  drive: number;
  gearbox: number;
  brand: number;
  model: number;
  exchangeCity: number;
}
export interface ICarAddResponce {
  id: number;
}

export interface ICarAddFormValues {
  userId: string;
  vinCode: string;
  stateNumber: string;
  totalOwners: number;
  description: string;
  mileage: number;
  price: number;
  isExchanged: boolean;
  isPromoted: boolean;
  body: number;
  engine: number;
  drive: number;
  gearbox: number;
  brand: number;
  model: number;
  exchangeCity: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  manufacturedAt: any;
}

export interface IFilterState {
  filter: IFilter;
  setFilter: React.Dispatch<React.SetStateAction<IFilter>>;
}
export interface IResetState {
  isReset: boolean;
  setIsReset: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ICarAddPhotoRequest {
  carId: number;
  data: FormData;
}
