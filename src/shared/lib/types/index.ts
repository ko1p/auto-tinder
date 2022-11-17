export interface IError {
  status: number;
  data: {
    Exception: string;
    Reason: string;
    Timestamp: string;
    status?: string;
    message?: string;
  };
}
export interface IUserCarPage {
  carId: string;
  userId: string;
}
