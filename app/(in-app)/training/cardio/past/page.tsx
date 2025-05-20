import {
  PastTraining,
  DatePastTrainingSection,
  PerformanceMetrics,
  WeeklySummarySection,
  WeeklyWorkoutsSection,
} from './_components';

export default function PastTrainingPage() {
  return (
    <div className="pt-[56px] pb-[80px] max-w-3xl mx-auto px-4">
      <PastTraining />
      <main>
        <DatePastTrainingSection />
        <PerformanceMetrics />
        <WeeklySummarySection />
        <WeeklyWorkoutsSection />
      </main>
    </div>
  );
}
