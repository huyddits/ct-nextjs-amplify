import { getStrengthPastTrainingData } from '@/api/strength.api';
import { GetStrengthPastTrainingDataPayload } from '@/api/types/strength';
import useSWR from 'swr';

export const PAST_TRANING_KEY = 'PAST_TRANING_KEY';
export const useGetPastStrengthTraining = (params: GetStrengthPastTrainingDataPayload) => {
  return useSWR([PAST_TRANING_KEY, params], async () => {
    const { data } = await getStrengthPastTrainingData(params);
    return data.data;
  });
};
