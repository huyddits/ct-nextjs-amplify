'use client';
import { useEffect, useMemo, useState } from 'react';
import {
  PastTraining,
  DatePastTrainingSection,
  PerformanceMetrics,
  WeeklySummarySection,
  WeeklyWorkoutsSection,
} from './_components';
import { usePastCardioTraining } from './_hooks';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';

const dateFormat = 'YYYY-MM-DD';

export default function PastTrainingPage() {
  dayjs.extend(isoWeek);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [metric, setMetric] = useState<string>('duration');

  const from = useMemo(() => {
    return dayjs(selectedDate).startOf('isoWeek').format(dateFormat);
  }, [selectedDate]);

  const to = useMemo(() => {
    return dayjs(selectedDate).endOf('isoWeek').format(dateFormat);
  }, [selectedDate]);

  const options = useMemo(() => {
    return { from, to, metric };
  }, [from, to, metric]);

  const { performanceMetricsItems, weeklySummaryItems, weeklyWorkoutItems } =
    usePastCardioTraining(options);

  return (
    <div className="pt-[56px] pb-[80px] max-w-3xl mx-auto px-4">
      <PastTraining />
      <main>
        <DatePastTrainingSection selectedDate={selectedDate} onChangeDate={setSelectedDate} />
        <PerformanceMetrics
          performanceMetricsItems={performanceMetricsItems}
          metric={metric}
          setMetric={setMetric}
        />
        <WeeklySummarySection weeklySummaryItems={weeklySummaryItems} />
        <WeeklyWorkoutsSection weeklyWorkoutItems={weeklyWorkoutItems} />
      </main>
    </div>
  );
}
