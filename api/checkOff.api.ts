import axiosIns from '@/lib/axiosIns';
import { END_POINTS } from '@/utils/constants/endpoints';
import {
  CheckOffDataResponse,
  CheckOffReferenceResponse,
  CheckOffStudentReviewResponse,
  UpdateCheckOffStudentReviewBody,
  CreateCheckOffPayload,
  CreateCheckOffResponse,
  CheckOffByAthleteResponse,
  CheckOffDateParams,
} from './types/checkOff';
export const getTeamDataCheckOff = async ({ month, year }: CheckOffDateParams) => {
  return axiosIns.get<CheckOffDataResponse>(`${END_POINTS.CHECK_OFF_TEAM_DATA}/check-off`, {
    params: { month, year },
  });
};

export const getCheckOffReference = async ({ month, year }: CheckOffDateParams) => {
  return axiosIns.get<CheckOffReferenceResponse>(
    `${END_POINTS.CHECK_OFF_TEAM_DATA}/quick-reference`,
    {
      params: { month, year },
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

export const getCheckOffByAthlete = async (
  athlete_id: string,
  { month, year }: CheckOffDateParams
) => {
  return axiosIns.get<CheckOffByAthleteResponse>(`${END_POINTS.CHECK_OFF_TEAM_DATA}/by-athlete`, {
    params: { athlete_id, month, year },
  });
};
