import { StrengthApi } from '@/api';
import { ROUTES } from '@/utils/constants';
import { useRouter } from 'next/navigation';

export const useProgramItem = (id: number) => {
  const router = useRouter();
  const onCopy = () => {};

  const onEdit = () => {
    router.push(`/${ROUTES.TRAINING_STRENGTH_PROGRAM}/${id}`);
  };

  const onDelete = () => {};

  return {
    onCopy,
    onEdit,
    onDelete,
  };
};
