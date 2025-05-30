import { PastCardioTrainingApi } from '@/api';
import { useMemo } from 'react';
import { type WeeklyWorkouts, type WeeklySummary, type PerformanceMetrics } from '../_types/index';
// import { AxiosError } from 'axios';
// import { useEffect, useState } from 'react';

import useSWR, { useSWRConfig } from 'swr';

type UsePastCardioTrainingOptions = {
  onSuccess?: () => void;
  onFailure?: (message: string) => void;
  from: string; // 'YYYY-MM-DD'
  to: string; // 'YYYY-MM-DD'
  metric?: string;
};

export const usePastCardioTraining = (options: UsePastCardioTrainingOptions) => {
  const { cache } = useSWRConfig();
  console.log('cache', cache);
  const swrKey = useMemo(() => {
    return ['past-cardio', options.from, options.to, options.metric ?? 'duration'];
  }, [options.from, options.to, options.metric]);
  console.log('SWR KEY STABLE?', JSON.stringify(swrKey));

  const fetcher = async (key: [string, string, string, string]) => {
    console.log('fetcher', key);
    const [_url, from, to, metric] = key;
    const [summaryRes, workoutsRes, metricsRes] = await Promise.allSettled([
      PastCardioTrainingApi.getWeeklySummary({ from, to }),
      PastCardioTrainingApi.getWeeklyWorkouts({ from, to }),
      PastCardioTrainingApi.getPerformanceMetrics({ from, to, metric: metric ?? 'duration' }),
    ]);

    const summary = summaryRes.status === 'fulfilled' && summaryRes.value.data.data;
    const workouts = workoutsRes.status === 'fulfilled' && workoutsRes.value.data.data;
    const metrics = metricsRes.status === 'fulfilled' && metricsRes.value.data.data;

    return {
      summary: {
        dailyAverageDistance: summary ? summary.dailyAverageDistance : 0,
        totalDistance: summary ? summary.totalDistance : 0,
        dailyAverageDuration: summary ? summary.dailyAverageDuration : 0,
        totalDuration: summary ? summary.totalDuration : 0,
        dailyAverageStairs: summary ? summary.dailyAverageStairs : 0,
        totalStairs: summary ? summary.totalStairs : 0,
        dailyAverageHeartRate: summary ? summary.dailyAverageHeartRate : 0,
      } as WeeklySummary,
      workouts: Array.isArray(workouts)
        ? workouts?.map?.(data => ({
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
        ? metrics?.map(data => ({
            date: data.date,
            value: data.value,
          }))
        : ([] as PerformanceMetrics[]),
    };
  };

  const { data, error } = useSWR(swrKey, fetcher, {
    onErrorRetry: (error, key, config, revalidate, { retryCount }) => {},
    revalidateIfStale: true,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    dedupingInterval: 10 * 60 * 1000,
  });

  return {
    weeklySummaryItems: data?.summary ?? null,
    weeklyWorkoutItems: data?.workouts ?? [],
    performanceMetricsItems: data?.metrics ?? [],
    isLoading: !error && !data,
    isError: !!error,
  };
};
