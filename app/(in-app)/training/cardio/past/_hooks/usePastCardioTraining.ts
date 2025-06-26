import { PastCardioTrainingApi } from '@/api';
import { useEffect, useMemo } from 'react';
import { type WeeklyWorkouts, type WeeklySummary, type PerformanceMetrics } from '../_types/index';

import useSWR, { mutate } from 'swr';
import { useLoading } from '@/hooks';

type UsePastCardioTrainingOptions = {
  onSuccess?: () => void;
  onFailure?: (message: string) => void;
  from: string; // 'YYYY-MM-DD'
  to: string; // 'YYYY-MM-DD'
  metric?: string;
};

export const usePastCardioTraining = (options: UsePastCardioTrainingOptions) => {
  const swrKey = useMemo(() => {
    return ['past-cardio', options.from, options.to, options.metric ?? 'duration'];
  }, [options.from, options.to, options.metric]);

  const { loading, startLoading, stopLoading } = useLoading();

  const fetcher = async (key: [string, string, string, string]) => {
    const [_url, from, to, metric] = key;
    startLoading();
    try {
      const [summaryRes, workoutsRes, metricsRes] = await Promise.allSettled([
        PastCardioTrainingApi.getWeeklySummary({ from, to }),
        PastCardioTrainingApi.getWeeklyWorkouts({ from, to }),
        PastCardioTrainingApi.getPerformanceMetrics({ from, to, metric: metric ?? 'duration' }),
      ]);

      const summary = summaryRes.status === 'fulfilled' && summaryRes.value.data.data;
      const workouts = workoutsRes.status === 'fulfilled' && workoutsRes.value.data.data;
      const metrics = metricsRes.status === 'fulfilled' && metricsRes.value.data.data;

      if (summaryRes.status !== 'fulfilled') console.warn('Failed to fetch summary');
      if (workoutsRes.status !== 'fulfilled') console.warn('Failed to fetch workouts');
      if (metricsRes.status !== 'fulfilled') console.warn('Failed to fetch metrics');

      console.log('summary', summary);
      return {
        summary: {
          dailyAverageDuration: summary ? summary.dailyAverageDuration : 0,
          totalDuration: summary ? summary.totalDuration : 0,
          dailyAverageDistance: summary ? summary.dailyAverageDistance : 0,
          totalDistance: summary ? summary.totalDistance : 0,
          distanceUnit: summary ? summary.distance_unit : '',
          dailyAverageStairs: summary ? summary.dailyAverageStairs : 0,
          totalStairs: summary ? summary.totalStairs : 0,
          dailyAverageHeartRate: summary ? summary.dailyAverageHeartRate : 0,
          unitType: summary ? summary.unit_type : '',
        } as WeeklySummary,
        workouts: Array.isArray(workouts)
          ? workouts.map(data => ({
              date: data.date,
              name: data.name,
              duration: data.duration,
              distance: data.distance,
              unit: data.unit,
              rpe: data.rpe,
              heartRate: data.heart_rate,
              notes: data.notes,
            }))
          : ([] as WeeklyWorkouts[]),
        metrics: Array.isArray(metrics)
          ? metrics.map(data => ({
              date: data.date,
              value: data.value,
            }))
          : ([] as PerformanceMetrics[]),
      };
    } finally {
      stopLoading();
    }
  };

  const { data, error } = useSWR(swrKey, fetcher, {
    onErrorRetry: () => {},
    revalidateIfStale: true,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    revalidateOnMount: true,
    dedupingInterval: 10 * 60 * 1000,
  });

  return {
    weeklySummaryItems: data?.summary ?? null,
    weeklyWorkoutItems: data?.workouts ?? [],
    performanceMetricsItems: data?.metrics ?? [],
    isLoading: !error && !data,
    isError: !!error,
    loading,
  };
};
