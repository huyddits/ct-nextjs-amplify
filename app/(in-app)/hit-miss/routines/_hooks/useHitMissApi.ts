import { getHitMissRoutineList } from '@/api/hitMiss.api';
import useSWR from 'swr';
import { duplicateHitMissRoutine, deleteHitMissRoutine } from '@/api/hitMiss.api';
import { mutate } from 'swr';
import useSWRMutation from 'swr/mutation';
import { toast } from 'react-toastify';

export const HIT_MISS_ROUTINE = {
  HIT_MISS_ROUTINE_LIST_KEY: 'HIT_MISS_ROUTINE_LIST_KEY',
};
export const useGetHitMissRoutineList = () => {
  return useSWR(HIT_MISS_ROUTINE.HIT_MISS_ROUTINE_LIST_KEY, async () => {
    const { data } = await getHitMissRoutineList();
    return data.data;
  });
};

export const useDuplicateHitMissRoutine = () => {
  return useSWRMutation<any, Error, string, number>(
    HIT_MISS_ROUTINE.HIT_MISS_ROUTINE_LIST_KEY,
    async (_key, { arg: routine_id }) => {
      const { data } = await duplicateHitMissRoutine(routine_id);
      return data;
    },
    {
      onSuccess: () => {
        mutate(HIT_MISS_ROUTINE.HIT_MISS_ROUTINE_LIST_KEY);
        toast.success('Routine duplicated successfully');
      },
      onError: err => {
        toast.error('Failed to duplicate routine');
      },
    }
  );
};

export const useDeleteHitMissRoutine = () => {
  return useSWRMutation<any, Error, string, number>(
    HIT_MISS_ROUTINE.HIT_MISS_ROUTINE_LIST_KEY,
    async (_key, { arg: routine_id }) => {
      const { data } = await deleteHitMissRoutine(routine_id);
      return data;
    },
    {
      onSuccess: () => {
        mutate(HIT_MISS_ROUTINE.HIT_MISS_ROUTINE_LIST_KEY);
        toast.success('Routine deleted successfully');
      },
      onError: err => {
        toast.error('Failed to delete routine');
      },
    }
  );
};
