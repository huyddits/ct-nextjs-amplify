import { getDashboard, getDashboardAlerts } from '@/api/dashboard.api';
import useSWR from 'swr';
import { v4 as uuid } from 'uuid';
export const DASHBOARD_KEYS = {
  DASHBOARD: 'DASHBOARD',
  DASHBOARD_ALERTS: 'DASHBOARD_ALERTS',
};

export function useDashboardApi() {
  return useSWR(
    DASHBOARD_KEYS.DASHBOARD,
    async () => {
      const { data } = await getDashboard();
      return data.data;
    },
    {
      dedupingInterval: 1000 * 60 * 30,
      keepPreviousData: true,
    }
  );
}

export function useGetDashboardAlert() {
  return useSWR(
    DASHBOARD_KEYS.DASHBOARD_ALERTS,
    async () => {
      const { data } = await getDashboardAlerts();
      data?.data?.alerts.pastDue.forEach(alert => {
        alert.id = uuid();
      });
      data?.data?.alerts.submitted.forEach(alert => {
        alert.id = uuid();
      });
      data?.data?.alerts.recentMeasurements.forEach(alert => {
        alert.id = uuid();
      });
      data?.data?.alerts.dueCheckoffs['1DayLeft'].forEach(alert => {
        alert.id = uuid();
      });
      data?.data?.alerts.dueCheckoffs['3DaysLeft'].forEach(alert => {
        alert.id = uuid();
      });
      data?.data?.alerts.dueCheckoffs['5DaysLeft'].forEach(alert => {
        alert.id = uuid();
      });
      return data.data;
    },
    {
      dedupingInterval: 1000 * 60 * 30,
      keepPreviousData: true,
    }
  );
}
