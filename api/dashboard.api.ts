import axiosIns from '@/lib/axiosIns';
import { END_POINTS } from '@/utils/constants/endpoints';
import { DashboardAlertsResponse, DashboardResponse } from './types/dashboard';

export const getDashboard = async () => {
  return axiosIns.get<DashboardResponse>(`${END_POINTS.DASHBOARD}/data`);
};

export const getDashboardAlerts = async () => {
  return axiosIns.get<DashboardAlertsResponse>(`${END_POINTS.DASHBOARD}/alert`);
};
// split alerts into separate endpoints for infinite loading
export const getDashboardCheckOffDue = async (params?: { page?: number; limit?: number }) => {
  return axiosIns.get<DashboardAlertsResponse>(`${END_POINTS.DASHBOARD}/checkoff-due`, { params });
};
export const getDashboardPastDue = async (params?: { page?: number; limit?: number }) => {
  return axiosIns.get<DashboardAlertsResponse>(`${END_POINTS.DASHBOARD}/checkoff-past-due`, {
    params,
  });
};
export const getDashboardCheckOffSubmitted = async (params?: { page?: number; limit?: number }) => {
  return axiosIns.get<DashboardAlertsResponse>(`${END_POINTS.DASHBOARD}/checkoff-submitted`, {
    params,
  });
};
export const getDashboardRecentMeasurements = async (params?: {
  page?: number;
  limit?: number;
}) => {
  return axiosIns.get<DashboardAlertsResponse>(`${END_POINTS.DASHBOARD}/recent-measurement`, {
    params,
  });
};
