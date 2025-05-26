'use client';
import { usePastCardioTraining } from '../_hooks';
import { useMemo } from 'react';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';

export default function WeeklySummarySection({ selectedDate }: Readonly<{ selectedDate: Date }>) {
  dayjs.extend(isoWeek);
  const from = useMemo(() => {
    return dayjs(selectedDate).startOf('isoWeek').format('YYYY-MM-DD');
  }, [selectedDate]);

  const to = useMemo(() => {
    return dayjs(selectedDate).endOf('isoWeek').format('YYYY-MM-DD');
  }, [selectedDate]);

  const { weeklySummaryItems } = usePastCardioTraining({ from, to });

  if (!weeklySummaryItems) {
    return <div className="bg-white rounded-lg shadow p-4 mb-4"></div>;
  }

  const listData = [
    { label: 'Daily Average Distance', value: `${weeklySummaryItems.dailyAverageDistance} km` },
    { label: 'Total Distance', value: `${weeklySummaryItems.totalDistance} km` },
    { label: 'Daily Average Duration', value: `${weeklySummaryItems.dailyAverageDuration} mins` },
    { label: 'Total Duration', value: `${weeklySummaryItems.totalDuration} mins` },
    { label: 'Daily Average Stairs', value: `${weeklySummaryItems.dailyAverageStairs} floors` },
    { label: 'Total Stairs', value: `${weeklySummaryItems.totalStairs} floors` },
    { label: 'Daily Average Heart Rate', value: `${weeklySummaryItems.dailyAverageHeartRate} bpm` },
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
