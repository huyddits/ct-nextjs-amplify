import { getDashboard } from '@/api/dashboard.api';
import useSWR from 'swr';

export const DASHBOARD_KEYS = {
  DASHBOARD: 'DASHBOARD',
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
