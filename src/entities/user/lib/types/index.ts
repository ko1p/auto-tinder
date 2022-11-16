export interface IUserProfileResponse {
  id: string;
  name: string;
  email: string;
  phone: string;
  hasPhone: boolean;
  hasCar: boolean;
  hasCarPreferece: boolean;
}

export interface IEditProfile {
  userId?: string;
  data: IUserProfileResponse;
  isEditOpen?: boolean;
  setIsEditOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IUserProfileEditValues {
  password?: string;
  name?: string;
  email?: string;
  phone?: string;
}

export interface IUserProfilePatchRequest {
  data: IUserProfileEditValues;
  userId: string;
}
