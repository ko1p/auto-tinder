export interface IUserAuthRequest {
  email: string;
  password: string;
}
export interface IUserAuthResponse {
  accessToken: string;
  user: {
    id: string;
    name: string;
    email: string;
    phone: string;
    isOnboarded: boolean;
  };
  hasPhone: boolean;
  hasCar: boolean;
  hasPreference: boolean;
}
