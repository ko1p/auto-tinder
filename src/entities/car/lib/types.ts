export interface ICarPhoto {
  id: number;
  photoLink: string;
}

export interface ICarProperty {
  id: number;
  name: string;
}

export interface ICarOwner {
  id: string;
  name: string;
  email: string;
  phone: string;
  authority: string;
}

export interface ICarReport {
  isMatchCharacteristics: boolean;
  totalOwners: number;
  isBanned: boolean;
  isWanted: boolean;
  totalMileageRecords: number;
}

export interface ICar {
  isExchanged: boolean;
  id: number;
  description: string;
  vinCode: string;
  stateNumber: string;
  manufacturedAt: number;
  mileage: number;
  price: number;
  isPromoted: boolean;
  user: ICarOwner;
  photos: ICarPhoto[];
  brand: ICarProperty;
  model: ICarProperty;
  engine: ICarProperty;
  drive: ICarProperty;
  gearbox: ICarProperty;
  body: ICarProperty;
  city: ICarProperty;
  report: ICarReport;
  totalOwners: number;
  todayLikes: number;
  todayViews: number;
  totalLikes: number;
  totalViews: number;
}

export interface ICarPatch {
  isExchanged?: boolean;
  id?: number;
  description?: string;
  vinCode?: string;
  stateNumber?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  manufacturedAt?: any;
  mileage?: number;
  price?: number;
  isPromoted?: boolean;
  user?: ICarOwner;
  photos?: ICarPhoto[];
  brand?: ICarProperty;
  model?: ICarProperty;
  engine?: number;
  drive?: number;
  gearbox?: number;
  body?: number;
  city?: number;
  report?: ICarReport;
  totalOwners?: number;
  todayLikes?: number;
  todayViews?: number;
  totalLikes?: number;
  totalViews?: number;
}

export interface IFilter {
  city: number[];
  brands: number[];
  models: number[];
  bodies: number[];
  gearboxes: number[];
  engines: number[];
  drives: number[];
  manufacturedAtStart: number;
  manufacturedAtFinish: number;
  priceStart: number;
  priceFinish: number;
  mileageStart: number;
  mileageFinish: number;
}
export interface IGetFilter {
  city: ICarProperty[];
  brands: ICarProperty[];
  models: ICarProperty[];
  bodies: ICarProperty[];
  gearboxes: ICarProperty[];
  engines: ICarProperty[];
  drives: ICarProperty[];
  manufacturedAtStart: number;
  manufacturedAtFinish: number;
  priceStart: number;
  priceFinish: number;
  mileageStart: number;
  mileageFinish: number;
}
