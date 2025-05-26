import axiosIns from '@/lib/axiosIns';
import {
  GetListPerformanceMetricsResponse,
  GetListWeeklySummaryResponse,
  GetListWeeklyWorkoutsResponse,
  PastTrainingPayload,
} from './types/pastCardioTraining';
import { END_POINTS } from '@/utils/constants';

export const getWeeklySummary = (payload: PastTrainingPayload) => {
  return axiosIns.get<GetListWeeklySummaryResponse>(END_POINTS.WEEKLY_SUMMARY, {
    params: payload,
  });
};

export const getWeeklyWorkouts = (payload: PastTrainingPayload) => {
  return axiosIns.get<GetListWeeklyWorkoutsResponse>(END_POINTS.WEEKLY_WORKOUTS, {
    params: payload,
  });
};

export const getPerformanceMetrics = (payload: PastTrainingPayload) => {
  return axiosIns.get<GetListPerformanceMetricsResponse>(END_POINTS.PERFORMANCE_METRICS, {
    params: payload,
  });
};
