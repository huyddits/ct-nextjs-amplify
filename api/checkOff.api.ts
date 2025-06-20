import axiosIns from '@/lib/axiosIns';
import { END_POINTS } from '@/utils/constants/endpoints';
import {
  CheckOffDataResponse,
  CheckOffReferenceResponse,
  CheckOffStudentReviewResponse,
  UpdateCheckOffStudentReviewBody,
  CreateCheckOffPayload,
  CreateCheckOffResponse,
} from './types/checkOff';
export const getTeamDataCheckOff = async (selectedDate?: string) => {
  return axiosIns.get<CheckOffDataResponse>(`${END_POINTS.CHECK_OFF_TEAM_DATA}/check-off`, {
    params: { selectedDate },
  });
};

export const getCheckOffReference = async (selectedDate?: string) => {
  return axiosIns.get<CheckOffReferenceResponse>(
    `${END_POINTS.CHECK_OFF_TEAM_DATA}/quick-reference`,
    {
      params: { selectedDate },
    }
  );
};

export const getCheckOffStudentReview = async (params?: { page?: number; limit?: number }) => {
  return axiosIns.get<CheckOffStudentReviewResponse>(`${END_POINTS.CHECK_OFF_STUDENT}/review`, {
    params,
  });
};

export const updateCheckOffStudentReview = async (body: UpdateCheckOffStudentReviewBody) => {
  return axiosIns.put(`${END_POINTS.CHECK_OFF_STUDENT}/review`, body);
};

export const postCheckOff = (payload: CreateCheckOffPayload) => {
  return axiosIns.post<CreateCheckOffResponse>(END_POINTS.CHECK_OFF_NEW, payload);
};
