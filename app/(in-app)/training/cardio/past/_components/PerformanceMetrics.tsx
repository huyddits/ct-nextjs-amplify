'use client';
import { AppSelect } from '@/components/compose';
import { useState } from 'react';
import { ResponsiveContainer, AreaChart, XAxis, YAxis, Area } from 'recharts';

const chartData = [
  { date: '1/20', minutes: 30 },
  { date: '1/22', minutes: 45 },
  { date: '1/24', minutes: 35 },
  { date: '1/26', minutes: 40 },
  { date: '1/28', minutes: 48 },
  { date: '1/30', minutes: 38 },
  { date: '2/1', minutes: 42 },
];

export default function PerformanceMetrics() {
  const [metric, setMetric] = useState('Duration');

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-4 w-full">
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Performance Metrics</h2>
      </div>

      <div className="mb-4">
        <AppSelect
          placeholder="Select Metric"
          selectedValue={metric}
          onChangeSelected={value => setMetric(value)}
          options={[
            { label: 'Duration', value: 'Duration' },
            { label: 'Distance', value: 'Distance' },
            { label: 'Stairs', value: 'Stairs' },
          ]}
          fullWidth
        />
      </div>

      <div className="h-[200px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorMinutes" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#257951" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#257951" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <XAxis dataKey="date" />
            <YAxis />
            <Area
              type="monotone"
              dataKey="minutes"
              stroke="#257951"
              fillOpacity={1}
              fill="url(#colorMinutes)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
