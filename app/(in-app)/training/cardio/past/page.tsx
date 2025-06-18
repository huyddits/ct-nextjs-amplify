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
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import { endOfISOWeek, format, startOfISOWeek } from 'date-fns';

// const dateFormat = 'YYYY-MM-DD';
const dateFormat = 'yyyy-MM-dd';

export default function PastTrainingPage() {
  dayjs.extend(isoWeek);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [metric, setMetric] = useState<string>('duration');

  const from = useMemo(() => {
    // return dayjs(selectedDate).startOf('isoWeek').format(dateFormat);
    return format(startOfISOWeek(selectedDate), 'yyyy-MM-dd');
  }, [selectedDate]);

  const to = useMemo(() => {
    // return dayjs(selectedDate).endOf('isoWeek').format(dateFormat);
    return format(endOfISOWeek(selectedDate), 'yyyy-MM-dd');
  }, [selectedDate]);

  const options = useMemo(() => {
    return { from, to, metric };
  }, [from, to, metric]);

  const { performanceMetricsItems, weeklySummaryItems, weeklyWorkoutItems } =
    usePastCardioTraining(options);

  return (
    <div className="padding-bottom-pagePast padding-top-pagePast max-w-3xl mx-auto px-4">
      <PastTraining />
      <main>
        <DatePastTrainingSection selectedDate={selectedDate} onChangeDate={setSelectedDate} />
        <PerformanceMetrics
          performanceMetricsItems={performanceMetricsItems}
          metric={metric}
          setMetric={setMetric}
        />
        {weeklySummaryItems && <WeeklySummarySection weeklySummaryItems={weeklySummaryItems} />}
        <WeeklyWorkoutsSection weeklyWorkoutItems={weeklyWorkoutItems} />
      </main>
    </div>
  );
}
