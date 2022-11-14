export interface IUserForgotRequest {
  email: string;
}

export interface IUserResetPasswordRequest {
  password: string;
  recoveryToken: string;
}
