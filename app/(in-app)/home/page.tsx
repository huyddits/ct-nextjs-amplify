'use client';
import { StatisticOnTimeSection, StatisticOnValueSection, AlertSection } from './_components';
import { useDashboardApi, useGetDashboardAlert } from './_hooks/useDashboardApi';
import dynamic from 'next/dynamic';
const FCMTestButton = dynamic(() => import('@/components/FCMTestButton'), { ssr: false });

export default function HomePage() {
  const { data: dashboardData, isLoading } = useDashboardApi();
  const { data: alertsData, isLoading: isLoadingAlert } = useGetDashboardAlert();
  return (
    <>
      <div className="pt-4 pb-[80px] max-w-3xl mx-auto p-4">
        <StatisticOnTimeSection
          teamCheckOff={dashboardData?.team_check_off}
          hitMiss={dashboardData?.hit_miss}
          loading={isLoading}
        />
        <StatisticOnValueSection
          teamTrainingAverages={dashboardData?.team_training_average}
          loading={isLoading}
        />
        <AlertSection alerts={alertsData?.alerts} loading={isLoadingAlert} />
      </div>
      <div className="pt-4 pb-4 max-w-3xl mx-auto p-4">
        <FCMTestButton />
      </div>
    </>
  );
}
