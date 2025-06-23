import axiosIns from '@/lib/axiosIns';
import { END_POINTS } from '@/utils/constants';
import type {
  CreateUserPayload,
  CreateUserResponse,
  ResetPasswordPayload,
  ForgotPasswordPayload,
  ForgotPasswordResponse,
  GetPersonalInfoResponse,
  UpdatePersonalInfoPayload,
  UpdatePersonalInfoResponse,
  UpdatePersonalAcknowledgePayload,
} from './types/users';

export const registerUser = (payload: CreateUserPayload) => {
  return axiosIns.post<CreateUserResponse>(END_POINTS.SIGNUP, payload);
};

export const forgotPassword = (payload: ForgotPasswordPayload) => {
  return axiosIns.post<ForgotPasswordResponse>(END_POINTS.USERS_FORGOT_PASSWORD, payload);
};

export const resetPassword = (payload: ResetPasswordPayload) => {
  return axiosIns.put(
    END_POINTS.USERS_RESET_PASSWORD,
    { new_password: payload.new_password },
    {
      headers: {
        token: payload.token,
      },
    }
  );
};

export const getPersonalInfo = () => {
  return axiosIns.get<GetPersonalInfoResponse>(END_POINTS.USERS_ME);
};

export const updatePersonalInfo = (payload: UpdatePersonalInfoPayload) => {
  return axiosIns.put<UpdatePersonalInfoResponse>(END_POINTS.USERS_PROFILE, payload);
};

export const updateAcknowledge = (payload: UpdatePersonalAcknowledgePayload) => {
  return axiosIns.put(END_POINTS.USERS_ACKNOWLEDGE, payload);
};
