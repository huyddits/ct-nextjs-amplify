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

export type WeeklySummaryPayload = {
  from: string;
  to: string;
};

export type GetListWeeklySummaryResponse = ApiResponse<WeeklySummaryResponse, {}>;
