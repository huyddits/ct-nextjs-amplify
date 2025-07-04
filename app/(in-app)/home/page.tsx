'use client';
import { useRef } from 'react';
import { StatisticOnTimeSection, StatisticOnValueSection, AlertListSection } from './_components';
import {
  useDashboardApi,
  useGetDashboardCheckOffDue,
  useGetDashboardPastDue,
  useGetDashboardCheckOffSubmitted,
  useGetDashboardRecentMeasurements,
} from './_hooks/useDashboardApi';

export default function HomePage() {
  const fetchKey = useRef(Math.random().toString(36).substring(2, 15));
  const { data: dashboardData, isLoading } = useDashboardApi();

  return (
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
      <section>
        <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
          <div className="mb-12">
            <h2 className="font-semibold mb-3">Alerts</h2>

            <div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-8">
              <AlertListSection
                title="Check-Offs Due"
                fetcherHook={useGetDashboardCheckOffDue}
                valuePrefix="Due:"
                emptyText="No check-offs due."
                fetchKey={fetchKey.current}
                alertType="checkoff_due"
              />
              <AlertListSection
                title="Past-Due Check-Offs"
                colorClass="red"
                fetcherHook={useGetDashboardPastDue}
                valuePrefix="Due:"
                emptyText="No past-due check-offs."
                fetchKey={fetchKey.current}
                alertType="past_due"
              />
              <AlertListSection
                title="Submitted Check-Offs"
                colorClass="green"
                fetcherHook={useGetDashboardCheckOffSubmitted}
                valuePrefix="Submitted:"
                emptyText="No submitted check-offs."
                fetchKey={fetchKey.current}
                alertType="submitted"
              />
              <AlertListSection
                title="Recent Measurements"
                colorClass="blue"
                fetcherHook={useGetDashboardRecentMeasurements}
                emptyText="No recent measurements."
                fetchKey={fetchKey.current}
                alertType="recent_measurement"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
