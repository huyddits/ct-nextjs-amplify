import { getTraningLog } from '@/api/strength.api';
import useSWR from 'swr';

export const TRANING_LOG_KEY = 'TRANING_LOG_KEY';
export const useTrainingLog = () => {
  return useSWR([TRANING_LOG_KEY], async () => {
    const { data } = await getTraningLog();
    return data.data;
  });
};
