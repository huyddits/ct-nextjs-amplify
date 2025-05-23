'use client';
import { endOfWeek, format, startOfWeek } from 'date-fns';
import { usePastCardioTraining } from '../_hooks';
import { useMemo } from 'react';
import dayjs from 'dayjs';

export default function WeeklySummarySection({ selectedDate }: { selectedDate: Date }) {
  const from = useMemo(() => {
    return dayjs(selectedDate).startOf('week').format('YYYY-MM-DD');
  }, [selectedDate]);

  const to = useMemo(() => {
    return dayjs(selectedDate).endOf('week').format('YYYY-MM-DD');
  }, [selectedDate]);

  const { weeklySummary } = usePastCardioTraining({ from, to });

  if (!weeklySummary) {
    return <div className="bg-white rounded-lg shadow p-4 mb-4"></div>;
  }

  const listData = [
    { label: 'Daily Average Distance', value: `${weeklySummary.dailyAverageDistance} km` },
    { label: 'Total Distance', value: `${weeklySummary.totalDistance} km` },
    { label: 'Daily Average Duration', value: `${weeklySummary.dailyAverageDuration} mins` },
    { label: 'Total Duration', value: `${weeklySummary.totalDuration} mins` },
    { label: 'Daily Average Stairs', value: `${weeklySummary.dailyAverageStairs} floors` },
    { label: 'Total Stairs', value: `${weeklySummary.totalStairs} floors` },
    { label: 'Daily Average Heart Rate', value: `${weeklySummary.dailyAverageHeartRate} bpm` },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-4">
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Weekly Summary</h2>
      </div>
      <div className="space-y-4">
        {listData.map((item, index) => (
          <div key={index} className="flex justify-between">
            <div className="text-gray-600">{item.label}:</div>
            <div className="text-gray-900 font-medium">{item.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
