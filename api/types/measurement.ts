import { ApiResponse } from '@/utils/types';
type MeasurementListResponse = {
  measurement_id: number;
  name: string;
  instruction: string;
  imperial_unit: string;
  metric_unit: string;
  thumbnail_link: string;
  video_link: string;
};

type AthleteListResponse = {
  athlete_id: number;
  first_name: string;
  last_name: string;
  email: string;
  avatar_link: string;
  measurement_unit: string;
};

export type GetListMeasurementResponse = ApiResponse<MeasurementListResponse[], {}>;

export type GetListAthleteResponse = ApiResponse<AthleteListResponse[], {}>;
