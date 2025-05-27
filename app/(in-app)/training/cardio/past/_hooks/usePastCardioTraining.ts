import { PastCardioTrainingApi } from '@/api';
import { type WeeklyWorkouts, type WeeklySummary, type PerformanceMetrics } from '../_types/index';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';

type UsePastCardioTrainingOptions = {
  onSuccess?: () => void;
  onFailure?: (message: string) => void;
  from: string; // 'YYYY-MM-DD'
  to: string; // 'YYYY-MM-DD'
  metric?: string;
};

export const usePastCardioTraining = (options: UsePastCardioTrainingOptions) => {
  const [weeklySummaryItems, setWeeklySummary] = useState<WeeklySummary | null>(null);

  const [weeklyWorkoutItems, setWeeklyWorkouts] = useState<WeeklyWorkouts[]>([]);

  const [performanceMetricsItems, setPerformanceMetrics] = useState<PerformanceMetrics[]>([]);

  const getWeeklySummary = async (from: string, to: string) => {
    console.log({ from, to }, 'getWeeklySummary');
    try {
      const response = await PastCardioTrainingApi.getWeeklySummary({ from, to });
      const { data, error } = response.data;
      if (!data) throw error;
      setWeeklySummary({
        dailyAverageDistance: data.dailyAverageDistance,
        totalDistance: data.totalDistance,
        dailyAverageDuration: data.dailyAverageDuration,
        totalDuration: data.totalDuration,
        dailyAverageStairs: data.dailyAverageStairs,
        totalStairs: data.totalStairs,
        dailyAverageHeartRate: data.dailyAverageHeartRate,
      });
      options?.onSuccess?.();
    } catch (error) {
      console.error(error);
      return;
    }
  };

  const getWeeklyWorkouts = async (from: string, to: string) => {
    try {
      const response = await PastCardioTrainingApi.getWeeklyWorkouts({ from, to });
      const { data, error } = response.data;
      if (!data) throw error;
      const WeeklyWorkoutsItems: WeeklyWorkouts[] = data.map(data => ({
        date: data.date,
        name: data.name,
        duration: data.duration,
        distance: data.distance,
        unit: data.unit,
        rpe: data.rpe,
        heartRate: data.heart_rate,
        notes: data.notes,
      }));
      setWeeklyWorkouts(WeeklyWorkoutsItems);
      options?.onSuccess?.();
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError?.response?.status === 404) {
        setWeeklyWorkouts([]);
      } else {
        return;
      }
    }
  };

  const getPerformanceMetrics = async (from: string, to: string, metric: string) => {
    console.log({ from, to, metric }, 'getPerformanceMetrics');
    try {
      const response = await PastCardioTrainingApi.getPerformanceMetrics({ from, to, metric });
      const { data, error } = response.data;
      if (!data) throw error;
      const PerformanceMetricsItems: PerformanceMetrics[] = data.map(data => ({
        date: data.date,
        value: data.value,
      }));
      setPerformanceMetrics(PerformanceMetricsItems);
    } catch (error) {
      console.error(error);
      return;
    }
  };
  useEffect(() => {
    getWeeklySummary(options.from, options.to);
    getWeeklyWorkouts(options.from, options.to);
    getPerformanceMetrics(options.from, options.to, options.metric ?? 'duration');
  }, [options.from, options.to, options.metric]);

  return {
    weeklySummaryItems,
    weeklyWorkoutItems,
    performanceMetricsItems,
  };
};
