import { ApiResponse } from '@/utils/types';

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
