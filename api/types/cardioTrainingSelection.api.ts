import { ApiResponse } from '@/utils/types';

export type CreateCardioPayload = {
  workout_date: string; // YYYY-MM-DD
  exercises: number;
  notes: string;
  intervals: intervalsPayload[];
};

export type intervalsPayload = {
  duration: number;
  distance: number;
  distance_unit: string;
  heart_rate_min: number;
  heart_rate_max: number;
  rpe: string;
};

export type CreateCardioResponse = ApiResponse<{}, {}>;
