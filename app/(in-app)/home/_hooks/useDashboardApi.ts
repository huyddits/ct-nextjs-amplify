import {
  getDashboard,
  getDashboardCheckOffDue,
  getDashboardPastDue,
  getDashboardCheckOffSubmitted,
  getDashboardRecentMeasurements,
  dismissDashboardAlert,
} from '@/api/dashboard.api';
import useSWR from 'swr';
import useSWRInfinite from 'swr/infinite';
import useSWRMutation from 'swr/mutation';
import { DismissAlertParams } from '@/api/types/dashboard';

export const DASHBOARD_KEYS = {
  DASHBOARD: 'DASHBOARD',
  DASHBOARD_ALERTS: 'DASHBOARD_ALERTS',
  CHECKOFF_DUE: 'DASHBOARD_CHECKOFF_DUE',
  PAST_DUE: 'DASHBOARD_PAST_DUE',
  CHECKOFF_SUBMITTED: 'DASHBOARD_CHECKOFF_SUBMITTED',
  RECENT_MEASUREMENTS: 'DASHBOARD_RECENT_MEASUREMENTS',
};

export const DASHBOARD_MUTATION_KEYS = {
  DISMISS_ALERT: 'DASHBOARD_DISMISS_ALERT',
};

export function useDashboardApi() {
  return useSWR(
    DASHBOARD_KEYS.DASHBOARD,
    async () => {
      const { data } = await getDashboard();
      return data.data;
    },
    {
      dedupingInterval: 1000, // 1 second,
      initialSize: 1,
      parallel: true,
      persistSize: false,
    }
  );
}

// export function useGetDashboardAlert() {
//   return useSWR(
//     DASHBOARD_KEYS.DASHBOARD_ALERTS,
//     async () => {
//       const { data } = await getDashboardAlerts();
//       data?.data?.alerts.pastDue.forEach(alert => {
//         alert.id = uuid();
//       });
//       data?.data?.alerts.submitted.forEach(alert => {
//         alert.id = uuid();
//       });
//       data?.data?.alerts.recentMeasurements.forEach(alert => {
//         alert.id = uuid();
//       });
//       data?.data?.alerts.dueCheckoffs['1DayLeft'].forEach(alert => {
//         alert.id = uuid();
//       });
//       data?.data?.alerts.dueCheckoffs['3DaysLeft'].forEach(alert => {
//         alert.id = uuid();
//       });
//       data?.data?.alerts.dueCheckoffs['5DaysLeft'].forEach(alert => {
//         alert.id = uuid();
//       });
//       return data.data;
//     },
//     {
//       dedupingInterval: 1000 * 60 * 30,
//       keepPreviousData: true,
//     }
//   );
// }

// Infinite hooks for split alerts
export function useGetDashboardCheckOffDue(fetchKey: string) {
  return useSWRInfinite(
    (pageIndex, previousPageData) =>
      previousPageData && previousPageData.length === 0
        ? null
        : [DASHBOARD_KEYS.CHECKOFF_DUE, pageIndex + 1, fetchKey],
    async (key: [string, number]) => {
      const [, page] = key;
      // Fetch paginated alerts
      const { data } = await getDashboardCheckOffDue({ page, limit: 3 });
      return data;
    },
    {
      dedupingInterval: 1000, // 1 second,
      initialSize: 1,
      parallel: true,
      persistSize: false,
    }
  );
}

export function useGetDashboardPastDue(fetchKey: string) {
  return useSWRInfinite(
    (pageIndex, previousPageData) =>
      previousPageData && previousPageData.length === 0
        ? null
        : [DASHBOARD_KEYS.PAST_DUE, pageIndex + 1, fetchKey],
    async (key: [string, number]) => {
      const [, page] = key;
      const { data } = await getDashboardPastDue({ page, limit: 3 });

      return data;
    },
    {
      dedupingInterval: 1000, // 1 second,
      initialSize: 1,
      parallel: true,
      persistSize: false,
    }
  );
}

export function useGetDashboardCheckOffSubmitted(fetchKey: string) {
  return useSWRInfinite(
    (pageIndex, previousPageData) =>
      previousPageData && previousPageData.length === 0
        ? null
        : [DASHBOARD_KEYS.CHECKOFF_SUBMITTED, pageIndex + 1, fetchKey],
    async (key: [string, number]) => {
      const [, page] = key;
      const { data } = await getDashboardCheckOffSubmitted({ page, limit: 3 });

      return data;
    },
    {
      dedupingInterval: 1000, // 1 second,
      initialSize: 1,
      parallel: true,
      persistSize: false,
    }
  );
}

export function useGetDashboardRecentMeasurements(fetchKey: string) {
  return useSWRInfinite(
    (pageIndex, previousPageData) =>
      previousPageData && previousPageData.length === 0
        ? null
        : [DASHBOARD_KEYS.RECENT_MEASUREMENTS, pageIndex + 1, fetchKey],
    async (key: [string, number]) => {
      const [, page] = key;
      const { data } = await getDashboardRecentMeasurements({ page, limit: 3 });
      return data;
    },
    {
      dedupingInterval: 1000, // 1 second,
      initialSize: 1,
      parallel: true,
      persistSize: false,
    }
  );
}

export function useDismissDashboardAlert() {
  return useSWRMutation<any, Error, string, DismissAlertParams>(
    DASHBOARD_MUTATION_KEYS.DISMISS_ALERT,
    async (_key, { arg }) => {
      const { data } = await dismissDashboardAlert(arg);
      return data;
    }
  );
}
