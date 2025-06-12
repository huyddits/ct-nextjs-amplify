import { StrengthApi } from '@/api';
import { ROUTES } from '@/utils/constants';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export const useProgramItem = (id: number) => {
  const router = useRouter();
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

  return {
    onPlay,
    onCopy,
    onEdit,
    onDelete,
  };
};
