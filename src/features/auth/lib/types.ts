export interface IUserAuthRequest {
  email: string;
  password: string;
}

export interface IUserAuthResponse {
  accessToken?: string | null;
  userId?: string | null;
  isLogout?: boolean;
}
