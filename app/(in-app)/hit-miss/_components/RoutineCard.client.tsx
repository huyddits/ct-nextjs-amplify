'use client';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/utils/constants';
import { copyToClipboard } from '@/utils/helpers';
import { CopyIcon, Edit2Icon, Trash2Icon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

type RoutineItem = {
  id: string;
  name: string;
};

export default function RoutineCard({ id, listItems }: { id: string; listItems: RoutineItem[] }) {
  const router = useRouter();
  const onCopy = () => {
    const result = listItems.map((item, index) => `${index + 1}. ${item.name}`).join('\n');
    copyToClipboard(result);
    toast.success('Copied to clipboard');
  };

  const onEdit = () => {
    router.push(`/${ROUTES.HIT_MISS_ROUTINES}/${id}/edit`);
  };

  const onDelete = () => {};
  return (
    <div className="border border-gray-300 rounded-lg p-4 mb-4">
      <div className="flex justify-end space-x-2 mb-2">
        <Button variant="ghost" onClick={onCopy} className="rounded-full">
          <CopyIcon className="w-5 h-5 text-inherit" />
        </Button>
        <Button variant="ghost" onClick={onEdit} className="rounded-full">
          <Edit2Icon className="w-5 h-5 text-inherit" />
        </Button>
        <Button variant="ghost" onClick={onDelete} className="rounded-full">
          <Trash2Icon className="w-5 h-5 text-inherit" />
        </Button>
      </div>
      <h2 className="text-lg font-semibold text-primary mb-3">Game Day Performance</h2>
      <ol className="space-y-2">
        {listItems.map((item, index) => (
          <li key={item.name} className="text-gray-700">
            {index + 1} {item.name}
          </li>
        ))}
      </ol>
    </div>
  );
}
