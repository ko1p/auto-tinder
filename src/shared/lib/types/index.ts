export interface IError {
  status: number;
  data: {
    Exception: string;
    Reason: string;
    Timestamp: string;
  };
}
