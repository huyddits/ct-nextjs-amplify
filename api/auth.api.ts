import axiosIns from '@/lib/axiosIns';
import { END_POINTS } from '@/utils/constants';
import { LoginPayload, LoginResponse, LoginSocialPayload, LoginSocialResponse } from './types/auth';

export const login = (payload: LoginPayload) => {
  return axiosIns.post<LoginResponse>(END_POINTS.AUTH_LOGIN, payload);
};

export const loginSocial = (payload: LoginSocialPayload) => {
  return axiosIns.post<LoginSocialResponse>(END_POINTS.AUTH_LOGIN_SOCIAL, payload);
};
