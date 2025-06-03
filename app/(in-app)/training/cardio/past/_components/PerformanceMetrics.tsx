'use client';
import { AppSelect } from '@/components/compose';
import { Dispatch, SetStateAction } from 'react';
import { ResponsiveContainer, AreaChart, XAxis, YAxis, Area } from 'recharts';
import { Metric } from '../../../cardio/_types/index';
export default function PerformanceMetrics({
  metric,
  performanceMetricsItems,
  setMetric,
}: Readonly<{
  performanceMetricsItems: any;
  metric: string;
  setMetric: Dispatch<SetStateAction<string>>;
}>) {
  const metricOptions = [
    { label: 'Duration', value: Metric.Duration },
    { label: 'Distance', value: Metric.Distance },
    { label: 'Stairs', value: Metric.Stairs },
  ];

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
          options={metricOptions}
          fullWidth
        />
      </div>

      <div className="h-[200px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={performanceMetricsItems}>
            <defs>
              <linearGradient id="colorMinutes" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" className="stop-primary" stopOpacity={0.8} />
                <stop offset="95%" className="stop-primary" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <XAxis dataKey="date" />
            <YAxis />
            <Area
              type="monotone"
              dataKey="value"
              stroke="primary"
              fillOpacity={1}
              fill="url(#colorMinutes)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
