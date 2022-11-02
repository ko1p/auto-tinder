export interface ICarFormStepOne {
  vinCode: string;
  stateNumber: string;
  totalOwners: number;
  exchangeCity: number;
  mileage: number;
  brand: number;
  model: number;
}

export interface ListItem {
  name: string;
  id: number;
}

export interface ListModel {
  [idBrand: number]: ListItem[];
}

export interface ICar {
  userId: string;

  vinCode: string;
  stateNumber: string;
  totalOwners: number;
  exchangeCity: number;
  mileage: number;
  brand: number;
  model: number;

  body: number;
  engine: number;
  gearbox: number;
  drive: number;
  description: string;
  price: number;
  manufacturedAt: number;
  isExchanged: boolean;
  isPromoted: boolean;
}

export type IFilters = {
  carId: number;
  city: number;
  brand: number[];
  model: number[];
  body: number;
  engine: number;
  gearbox: number;
  drive: number;
  priceStart: number;
  priceFinish: number;
  manufacturedAtStart: number;
  manufacturedAtFinish: number;
  mileageStart: number;
  mileageFinish: number;
};

export interface IDictionaryResponse {
  status: number | null;
  data?: ListItem[];
}
