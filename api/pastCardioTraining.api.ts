import axiosIns from '@/lib/axiosIns';
import { GetListWeeklySummaryResponse, WeeklySummaryPayload } from './types/pastCardioTraining';
import { END_POINTS } from '@/utils/constants';

export const getWeeklySummary = (payload: WeeklySummaryPayload) => {
  return axiosIns.get<GetListWeeklySummaryResponse>(END_POINTS.WEEKLY_SUMMARY, {
    params: payload,
  });
};
