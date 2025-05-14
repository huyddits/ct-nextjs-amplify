import { ApiResponse, SocialProvider } from '@/utils/types';

export type LoginPayload = {
  email: string;
  password: string;
};

export type LoginResponse = ApiResponse<{
  token: {
    access_token: string;
  };
  user: {
    created_at: string;
    email: string;
    first_name: string;
    is_active: string;
    last_name: string;
    user_id: string;
  };
}>;

export type LoginSocialPayload = {
  accessToken: string;
  provider: SocialProvider;
};

export type LoginSocialResponse = ApiResponse<{
  token: {
    access_token: string;
  };
  user: {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    is_active: boolean;
    created_at: string; // Date string
  };
}>;
