import { getHitMissRoutineList } from '@/api/hitMiss.api';
import useSWR from 'swr';
import { duplicateHitMissRoutine, deleteHitMissRoutine } from '@/api/hitMiss.api';
import { mutate } from 'swr';
import useSWRMutation from 'swr/mutation';
import { toast } from 'react-toastify';
import { getCoachStudentList } from '@/api/measurement.api';

export const HIT_MISS_ROUTINE = {
  HIT_MISS_ROUTINE_LIST_KEY: 'HIT_MISS_ROUTINE_LIST_KEY',
  DUPLICATE_HIT_MISS_ROUTINE_KEY: 'DUPLICATE_HIT_MISS_ROUTINE_KEY',
  DELETE_HIT_MISS_ROUTINE_KEY: 'DELETE_HIT_MISS_ROUTINE_KEY',
  COACH_STUDENT_LIST_KEY: 'COACH_STUDENT_LIST_KEY',
};
export const useGetHitMissRoutineList = () => {
  return useSWR(HIT_MISS_ROUTINE.HIT_MISS_ROUTINE_LIST_KEY, async () => {
    const { data } = await getHitMissRoutineList();
    return data.data;
  });
};

export const useDuplicateHitMissRoutine = () => {
  return useSWRMutation<any, Error, string, number>(
    HIT_MISS_ROUTINE.DUPLICATE_HIT_MISS_ROUTINE_KEY,
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
    HIT_MISS_ROUTINE.DELETE_HIT_MISS_ROUTINE_KEY,
    async (_key, { arg: routine_id }) => {
      const { data } = await deleteHitMissRoutine(routine_id);
      return data;
    },
    {
      onSuccess: () => {
        mutate(HIT_MISS_ROUTINE.HIT_MISS_ROUTINE_LIST_KEY);
        toast.success('Routine deleted successfully');
      },
      onError: () => {
        toast.error('Failed to delete routine');
      },
    }
  );
};

export const useGetListAthlete = (coach_code: string) => {
  const enabledKey = coach_code ? [HIT_MISS_ROUTINE.COACH_STUDENT_LIST_KEY, coach_code] : null;
  return useSWR(enabledKey, async () => {
    const { data } = await getCoachStudentList({ coach_code });
    return data.data;
  });
};
