export type WeeklyWorkouts = {
  date: string;
  name: string;
  duration: number;
  distance: number;
  unit: string;
  rpe: string;
  heartRate: number;
  notes: string;
};

export type WeeklySummary = {
  dailyAverageDuration: number;
  totalDuration: number;
  dailyAverageDistance: number;
  totalDistance: number;
  dailyAverageStairs: number;
  totalStairs: number;
  dailyAverageHeartRate: number;
};

export type PerformanceMetrics = {
  date: string;
  value: number;
};
