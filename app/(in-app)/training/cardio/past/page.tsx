'use client';
import { useMemo, useState } from 'react';
import {
  PastTraining,
  DatePastTrainingSection,
  PerformanceMetrics,
  WeeklySummarySection,
  WeeklyWorkoutsSection,
} from './_components';
import { usePastCardioTraining } from './_hooks';
import { endOfISOWeek, format, startOfISOWeek } from 'date-fns';

// const dateFormat = 'YYYY-MM-DD';
const dateFormat = 'yyyy-MM-dd';

export default function PastTrainingPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [metric, setMetric] = useState<string>('duration');

  const from = useMemo(() => {
    return format(startOfISOWeek(selectedDate), 'yyyy-MM-dd');
  }, [selectedDate]);

  const to = useMemo(() => {
    return format(endOfISOWeek(selectedDate), 'yyyy-MM-dd');
  }, [selectedDate]);

  const options = useMemo(() => {
    return { from, to, metric };
  }, [from, to, metric]);

  const { performanceMetricsItems, weeklySummaryItems, weeklyWorkoutItems, loading } =
    usePastCardioTraining(options);

  return (
    <div className="padding-bottom-pagePast padding-top-pagePast max-w-3xl mx-auto px-4">
      <PastTraining />
      <main>
        <DatePastTrainingSection selectedDate={selectedDate} onChangeDate={setSelectedDate} />
        {loading ? (
          <div className="text-center py-4 text-gray-500">Loading data...</div>
        ) : (
          <>
            <PerformanceMetrics
              performanceMetricsItems={performanceMetricsItems}
              metric={metric}
              setMetric={setMetric}
            />
            {weeklySummaryItems && <WeeklySummarySection weeklySummaryItems={weeklySummaryItems} />}
            <WeeklyWorkoutsSection weeklyWorkoutItems={weeklyWorkoutItems} />
          </>
        )}
      </main>
    </div>
  );
}
