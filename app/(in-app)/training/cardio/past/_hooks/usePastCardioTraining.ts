import { PastCardioTrainingApi } from '@/api';
import { WeeklySummaryResponse } from '@/api/types/pastCardioTraining';
import { useEffect, useState } from 'react';

type UsePastCardioTrainingOptions = {
  onSuccess?: () => void;
  onFailure?: (message: string) => void;
  from: string; // 'YYYY-MM-DD'
  to: string; // 'YYYY-MM-DD'
};

export const usePastCardioTraining = (options: UsePastCardioTrainingOptions) => {
  const [weeklySummary, setWeeklySummary] = useState<WeeklySummaryResponse | null>(null);

  const getWeeklySummary = async (from: string, to: string) => {
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
      options?.onFailure?.('Failed to get weekly summary');
    }
  };
  useEffect(() => {
    getWeeklySummary(options.from, options.to);
  }, [options.from, options.to]);

  return {
    weeklySummary,
  };
};
