import axiosIns from '@/lib/axiosIns';
import { END_POINTS } from '@/utils/constants/endpoints';
import { DashboardAlertsResponse, DashboardResponse } from './types/dashboard';

export const getDashboard = async () => {
  return axiosIns.get<DashboardResponse>(`${END_POINTS.DASHBOARD}/data`);
};

export const getDashboardAlerts = async () => {
  return axiosIns.get<DashboardAlertsResponse>(`${END_POINTS.DASHBOARD}/alert`);
};
