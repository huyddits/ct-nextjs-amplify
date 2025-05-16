import { AccountType, ApiResponse, MeasurementUnit } from '@/utils/types';

export type CreateUserPayload = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  date_of_birth: string; // YYYY-MM-DD;
  cheer_type_id: number;
  cheer_style_id: number;
  role_id: number;
  equipment_ids: number[];
  account_type: AccountType;
  measurement_unit: MeasurementUnit;
};

export type CreateUserResponse = ApiResponse<
  {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
  },
  {}
>;

export type ForgotPasswordPayload = {
  email: string;
  captcha: string;
};

export type ForgotPasswordResponse = ApiResponse<
  {
    token: string;
  },
  {
    email: string;
  }
>;

export type ResetPasswordPayload = {
  token: string;
  new_password: string;
};
