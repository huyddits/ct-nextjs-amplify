import axiosIns from '@/lib/axiosIns';
import { END_POINTS } from '@/utils/constants/endpoints';
import { DashboardResponse } from './types/dashboard';

export const getDashboard = async () => {
  return axiosIns.get<DashboardResponse>(END_POINTS.DASHBOARD);
};
