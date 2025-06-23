'use client';
import { HitMissRoutine } from '@/api/types/hitMiss';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/utils/constants';
import { CopyIcon, Edit2Icon, Trash2Icon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useDuplicateHitMissRoutine, useDeleteHitMissRoutine } from '../routines/_hooks';

type Props = {
  data: HitMissRoutine;
};

export default function RoutineCard({ data }: Props) {
  const { trigger: startCopy, isMutating: isCopying } = useDuplicateHitMissRoutine();
  const { trigger: startDelete, isMutating: isDeleting } = useDeleteHitMissRoutine();
  const router = useRouter();
  const onCopy = () => {
    startCopy(data.routine_id);
  };

  const onEdit = () => {
    router.push(`/${ROUTES.HIT_MISS_ROUTINES}/${data.routine_id}/edit`);
  };

  const onDelete = () => {
    startDelete(data.routine_id);
  };
  return (
    <div className="border border-gray-300 rounded-lg p-4 mb-4">
      <div className="flex justify-end space-x-2 mb-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={onCopy}
          className="rounded-full"
          loading={isCopying}
        >
          {!isCopying && <CopyIcon className="size-5 text-inherit" />}
        </Button>
        <Button variant="ghost" size="icon" onClick={onEdit} className="rounded-full">
          <Edit2Icon className="size-5 text-inherit" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={onDelete}
          className="rounded-full"
          loading={isDeleting}
        >
          {!isDeleting && <Trash2Icon className="size-5 text-inherit" />}
        </Button>
      </div>
      <h2 className="text-lg font-semibold text-primary mb-3 break-words">{data.name}</h2>
      <ol className="space-y-2">
        {data.sections.map((section, index) => (
          <li key={section.name} className="text-gray-700 break-words">
            {index + 1} {section.name}
          </li>
        ))}
      </ol>
    </div>
  );
}
