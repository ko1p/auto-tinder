export interface IUserAuthRequest {
  email: string;
  password: string;
}
export interface IUserAuthResponse {
  accessToken?: string | null;
  user?: {
    id?: string | null;
    name?: string | null;
    email?: string | null;
    phone?: string | null;
    isOnboarded?: boolean | null;
  };
  hasPhone?: boolean | null;
  hasCar?: boolean | null;
  hasPreference?: boolean | null;
}
