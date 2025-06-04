import { ApiResponse } from '@/utils/types';

export type WeeklySummaryResponse = {
  dailyAverageDuration: number;
  totalDuration: number;
  dailyAverageDistance: number;
  totalDistance: number;
  distance_unit: string;
  dailyAverageStairs: number;
  totalStairs: number;
  dailyAverageHeartRate: number;
  unit_type: string;
};

export type WeeklyWorkoutsResponse = {
  date: string;
  name: string;
  duration: number;
  distance: number;
  unit: string;
  rpe: string;
  heart_rate: number;
  notes: string;
  unit_type: string;
};

export type PerformanceMetricsResponse = {
  date: string;
  value: number;
};

export type PastTrainingPayload = {
  from: string;
  to: string;
  metric?: string;
};

export type GetListWeeklySummaryResponse = ApiResponse<
  WeeklySummaryResponse,
  {
    // msg?: string
  }
>;

export type GetListWeeklyWorkoutsResponse = ApiResponse<
  WeeklyWorkoutsResponse[],
  {
    // msg?: string
  }
>;

export type GetListPerformanceMetricsResponse = ApiResponse<
  PerformanceMetricsResponse[],
  {
    // msg?: string
  }
>;
