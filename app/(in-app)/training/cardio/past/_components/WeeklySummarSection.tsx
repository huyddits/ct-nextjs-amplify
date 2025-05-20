const listData = [
  { label: 'Daily Average Duration', value: '40 mins' },
  { label: 'Total Duration', value: '280 mins' },
  { label: 'Daily Average Distance', value: '3.5 miles' },
  { label: 'Total Distance', value: '24.5 miles' },
  { label: 'Daily Average Stairs', value: '7,500 stairs' },
  { label: 'Total Stairs', value: '52,500 stairs' },
  { label: 'Daily Average Heart Rate', value: '145 BPM' },
];

export default function WeeklySummarySection() {
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
