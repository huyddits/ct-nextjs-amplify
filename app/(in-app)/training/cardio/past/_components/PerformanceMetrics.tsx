'use client';
import { AppSelect } from '@/components/compose';
import dayjs from 'dayjs';
import { useMemo, useState } from 'react';
import { ResponsiveContainer, AreaChart, XAxis, YAxis, Area } from 'recharts';
import { usePastCardioTraining } from '../_hooks';
import isoWeek from 'dayjs/plugin/isoWeek';

export default function PerformanceMetrics({ selectedDate }: Readonly<{ selectedDate: Date }>) {
  dayjs.extend(isoWeek);
  const [metric, setMetric] = useState('duration');

  const from = useMemo(() => {
    return dayjs(selectedDate).startOf('isoWeek').format('YYYY-MM-DD');
  }, [selectedDate]);

  const to = useMemo(() => {
    return dayjs(selectedDate).endOf('isoWeek').format('YYYY-MM-DD');
  }, [selectedDate]);

  const { performanceMetricsItems } = usePastCardioTraining({ from, to, metric });

  if (!performanceMetricsItems) {
    return <div className="bg-white rounded-lg shadow p-4 mb-4"></div>;
  }

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
            { label: 'Duration', value: 'duration' },
            { label: 'Distance', value: 'distance' },
            { label: 'Stairs', value: 'stairs' },
          ]}
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
