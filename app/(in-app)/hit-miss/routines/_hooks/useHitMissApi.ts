import {
  createHitMissRoutine,
  getHitMissRoutineList,
  duplicateHitMissRoutine,
  deleteHitMissRoutine,
  updateHitMissRoutine,
  getHitMissRoutineDetail,
} from '@/api/hitMiss.api';
import useSWR, { mutate } from 'swr';
import useSWRMutation from 'swr/mutation';
import { toast } from 'react-toastify';
import { getCoachStudentList } from '@/api/measurement.api';
import { CreateRoutinePayload } from '@/api/types/hitMiss';

export const HIT_MISS_ROUTINE = {
  HIT_MISS_ROUTINE_LIST_KEY: 'HIT_MISS_ROUTINE_LIST_KEY',
  DUPLICATE_HIT_MISS_ROUTINE_KEY: 'DUPLICATE_HIT_MISS_ROUTINE_KEY',
  DELETE_HIT_MISS_ROUTINE_KEY: 'DELETE_HIT_MISS_ROUTINE_KEY',
  COACH_STUDENT_LIST_KEY: 'COACH_STUDENT_LIST_KEY',
  CREATE_HIT_MISS_ROUTINE: 'CREATE_HIT_MISS_ROUTINE',
  UPDATE_HIT_MISS_ROUTINE: 'UPDATE_HIT_MISS_ROUTINE',
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

export const useCreateHitMissRoutine = () => {
  return useSWRMutation<any, Error, string, CreateRoutinePayload>(
    HIT_MISS_ROUTINE.CREATE_HIT_MISS_ROUTINE,
    async (_key, { arg }) => {
      const { data } = await createHitMissRoutine(arg);
      return data;
    },
    {
      onSuccess: () => {
        mutate(HIT_MISS_ROUTINE.HIT_MISS_ROUTINE_LIST_KEY);
        toast.success('Routine created successfully');
      },
      onError: () => {
        toast.error('Failed to create routine');
      },
    }
  );
};

export const useUpdateHitMissRoutine = () => {
  return useSWRMutation<any, Error, string, { routine_id: number; body: CreateRoutinePayload }>(
    HIT_MISS_ROUTINE.UPDATE_HIT_MISS_ROUTINE,
    async (_key, { arg: { routine_id, body } }) => {
      const { data } = await updateHitMissRoutine(routine_id, body);
      return data;
    },
    {
      onSuccess: () => {
        mutate(HIT_MISS_ROUTINE.HIT_MISS_ROUTINE_LIST_KEY);
        toast.success('Routine updated successfully');
      },
      onError: () => {
        toast.error('Failed to update routine');
      },
    }
  );
};

export const useGetHitMissRoutineDetail = (routine_id?: string) => {
  const enabledKey = routine_id ? [HIT_MISS_ROUTINE.HIT_MISS_ROUTINE_LIST_KEY, routine_id] : null;
  return useSWR(
    enabledKey,
    async () => {
      const { data } = await getHitMissRoutineDetail(Number(routine_id));
      return data.data;
    },
    {
      dedupingInterval: 1000,
    }
  );
};
