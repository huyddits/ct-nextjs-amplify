import { StrengthApi } from '@/api';
import { useAuthStore, useStrengthStore } from '@/store';
import { ROUTES } from '@/utils/constants';
import { ProgramType } from '@/utils/types';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { toast } from 'react-toastify';

export const useProgramItem = (id: number) => {
  const router = useRouter();
  const { info } = useAuthStore();
  const { programType } = useStrengthStore();
  const onCopy = async (onSuccess?: () => void) => {
    try {
      await StrengthApi.duplicateProgram({ id });
      toast.success('Program duplicated successfully');
      onSuccess?.();
    } catch (error) {
      console.log(error);
    }
  };

  const onEdit = () => {
    router.push(`/${ROUTES.TRAINING_STRENGTH_PROGRAM}/${id}`);
  };

  const onDelete = async () => {
    try {
      await StrengthApi.deleteProgram(id);
      toast.success('Program deleted successfully');
    } catch (error) {
      console.log(error);
    }
  };

  const onPlay = async () => {
    router.push(`/${ROUTES.TRAINING_STRENGTH_EXERCISE}`.replace(':id', id.toString()));
  };

  const isCoach = useMemo(() => info?.accountType === 'coach', [info?.accountType]);

  const isAllowEdit = useMemo(() => {
    if (programType === ProgramType.MyPrograms) return true;
    if (programType === ProgramType.TeamPrograms) return isCoach;
  }, [programType, isCoach]);

  const isAllowCopy = useMemo(() => {
    if (programType === ProgramType.MyPrograms) return true;
    if (programType === ProgramType.TeamPrograms) return isCoach;
  }, [programType, isCoach]);

  const isAllowDelete = useMemo(() => {
    if (programType === ProgramType.MyPrograms) return true;
    if (programType === ProgramType.TeamPrograms) return isCoach;
  }, [programType, isCoach]);

  return {
    onPlay,
    onCopy,
    onEdit,
    onDelete,
    isAllowCopy,
    isAllowDelete,
    isAllowEdit,
  };
};
