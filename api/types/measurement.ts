import { ApiResponse } from '@/utils/types';
export type MeasurementListResponse = {
  measurement_id: number;
  name: string;
  instruction: string;
  imperial_unit: string;
  metric_unit: string;
  thumbnail_link: string;
  video_link: string;
};

export type Athlete = {
  account_type: string;
  email: string;
  stripe_customer_id: string;
  stripe_subscription_id: string;
  is_active: boolean;
  profile: AthleteProfile;
};

export type AthleteProfile = {
  profile_id: number;
  first_name: string;
  last_name: string;
  school_name: string;
  date_of_birth: string;
  coach_code: string;
};

export type CoachStudentResponse = {
  coach_student_id: number;
  athlete_id: string;
  status: string;
  athlete: Athlete;
};

export type FlyerAndBasesResponse = {
  measurementName: string;
  items: {
    name: string;
    result: number;
    unit: string;
  }[];
};

export type LatestResultResponse = {
  measurement_session_id: number;
  result: number;
  measurement_unit: string;
  created_at: string;
};

export type ImprovementResponse = {
  improvement: string;
  unit: string;
};

export type ResultForAllMeasurementsResponse = {
  measurement_id: number;
  measurement_name: string;
  result: number;
  measurement_unit: string;
  created_at: string;
};

export type CoachStudentPayload = {
  coach_code: string;
};

export type CreateMeasurementPayload = {
  measurement_id: number;
  athlete_id: string;
  result: number;
};

export type athletePayload = {
  measurement_id?: number;
  athlete_id?: string;
};

export type FlyerAndBasesPayLoad = {
  page: number;
  limit: number;
};

export type CreateMeasurementResponse = ApiResponse<{}, {}>;

export type GetListMeasurementResponse = ApiResponse<MeasurementListResponse[], {}>;

export type GetListCoachStudentResponse = ApiResponse<CoachStudentResponse[], {}>;

export type GetBasesSpotterResponse = ApiResponse<FlyerAndBasesResponse[], {}>;

export type GetFlyerResponse = ApiResponse<FlyerAndBasesResponse[], {}>;

export type GetLatestResultResponse = ApiResponse<LatestResultResponse, {}>;

export type GetImprovementResponse = ApiResponse<ImprovementResponse, {}>;

export type GetLastThreeMonthsResponse = ApiResponse<LatestResultResponse[], {}>;

export type GetThreeLatestResultsResponse = ApiResponse<LatestResultResponse[], {}>;

export type GetResultForAllMeasurementsResponse = ApiResponse<
  ResultForAllMeasurementsResponse[],
  {}
>;
