export interface IError {
  status: number;
  data: {
    Exception: string;
    Reason: string;
    Timestamp: string;
  };
}
export interface IUserCarPage {
  carId: string;
  userId: string;
}
