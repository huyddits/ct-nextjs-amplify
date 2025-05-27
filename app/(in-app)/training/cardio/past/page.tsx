'use client';
import { useState } from 'react';
import {
  PastTraining,
  DatePastTrainingSection,
  PerformanceMetrics,
  WeeklySummarySection,
  WeeklyWorkoutsSection,
} from './_components';

export default function PastTrainingPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  return (
    <div className="pt-[56px] pb-[80px] max-w-3xl mx-auto px-4">
      <PastTraining />
      <main>
        <DatePastTrainingSection selectedDate={selectedDate} onChangeDate={setSelectedDate} />
        <PerformanceMetrics selectedDate={selectedDate} />
        <WeeklySummarySection selectedDate={selectedDate} />
        <WeeklyWorkoutsSection selectedDate={selectedDate} />
      </main>
    </div>
  );
}
