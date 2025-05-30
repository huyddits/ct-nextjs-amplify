'use client';

export default function WeeklySummarySection({
  weeklySummaryItems,
}: Readonly<{ weeklySummaryItems: any }>) {
  const listData = [
    {
      label: 'Daily Average Duration',
      value: weeklySummaryItems?.dailyAverageDuration,
      unit: 'mins',
    },
    { label: 'Total Duration', value: weeklySummaryItems?.totalDuration, unit: 'mins' },
    {
      label: 'Daily Average Distance',
      value: weeklySummaryItems?.dailyAverageDistance,
      unit: 'miles',
    },
    { label: 'Total Distance', value: weeklySummaryItems?.totalDistance, unit: 'miles' },
    {
      label: 'Daily Average Stairs',
      value: weeklySummaryItems?.dailyAverageStairs,
      unit: 'stairs',
    },
    { label: 'Total Stairs', value: weeklySummaryItems?.totalStairs, unit: 'stairs' },
    {
      label: 'Daily Average Heart Rate',
      value: weeklySummaryItems?.dailyAverageHeartRate,
      unit: 'BPM',
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-4">
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Weekly Summary</h2>
      </div>
      <div className="space-y-4">
        {listData.map(item => (
          <div key={item.label} className="flex justify-between">
            <div className="text-gray-600">{item.label}:</div>
            <div className="text-gray-900 font-medium">
              {item.value} {item.unit}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
