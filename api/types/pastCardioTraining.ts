import { ApiResponse } from '@/utils/types';

export type WeeklySummaryResponse = {
  dailyAverageDuration: number;
  totalDuration: number;
  dailyAverageDistance: number;
  totalDistance: number;
  dailyAverageStairs: number;
  totalStairs: number;
  dailyAverageHeartRate: number;
};

export type WeeklyWorkoutsResponse = {
  date?: string;
  duration?: number;
  distance?: number;
  stairs?: number;
  rpe?: string;
  heart_rate_min?: number;
  heart_rate_max?: number;
  notes?: string;
};

export type PerformanceMetricsResponse = {
  date?: string;
  value?: number;
};

export type PastTrainingPayload = {
  from: string;
  to: string;
  metric?: string;
};

export type GetListWeeklySummaryResponse = ApiResponse<WeeklySummaryResponse, {}>;

export type GetListWeeklyWorkoutsResponse = ApiResponse<WeeklyWorkoutsResponse[], {}>;

export type GetListPerformanceMetricsResponse = ApiResponse<PerformanceMetricsResponse[], {}>;
