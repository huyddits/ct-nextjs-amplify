import axiosIns from '@/lib/axiosIns';
import { END_POINTS } from '@/utils/constants';
import { CreateUserPayload, CreateUserResponse } from './types/users';

export const registerUser = (payload: CreateUserPayload) => {
  return axiosIns.post<CreateUserResponse>(END_POINTS.SIGNUP, payload);
};
