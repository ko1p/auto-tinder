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
