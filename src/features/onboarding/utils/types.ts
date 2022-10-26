export interface ICarFormStepOne {
  vin: string;
  stateNumber: string;
  totalOwner: number;
  city: number;
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
