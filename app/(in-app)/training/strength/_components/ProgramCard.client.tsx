'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CopyIcon, PencilIcon, Trash2Icon, PlayIcon, CheckIcon } from 'lucide-react';
import { useProgramItem } from '../_hooks';
import { useConfirmStore } from '@/store';
import { useMemo } from 'react';
import { DEFAULT_DATE_FORMAT } from '@/utils/formatter';
import dayjs from 'dayjs';

interface ProgramCardProps {
  id: string;
  name: string;
  content: string;
  lastCompleted: string;
  onRefetch?: () => void;
}
export default function ProgramCard({
  id,
  name,
  content,
  lastCompleted,
  onRefetch,
}: ProgramCardProps) {
  const { onCopy, onDelete, onEdit, onPlay, isAllowCopy, isAllowDelete, isAllowEdit } =
    useProgramItem(+id);
  const { confirm } = useConfirmStore();

  const onConfirmDelete = () => {
    confirm({
      title: 'Delete Program',
      description: 'Are you sure you want to delete this program?',
      onConfirm: async () => {
        await onDelete();
        onRefetch?.();
      },
      confirmClass: 'bg-red-500 hover:bg-red-600',
    });
  };

  const isWorkoutSessionFinished = useMemo(() => {
    const today = lastCompleted.slice(0, DEFAULT_DATE_FORMAT.length); /** MM-DD-YYYY */
    const isToday = dayjs(today, DEFAULT_DATE_FORMAT).isSame(dayjs(), 'date');
    return isToday;
  }, [lastCompleted]);

  return (
    <Card className="p-4 rounded-xl shadow-sm">
      <div className="flex justify-between items-start">
        <div className="flex-1 pr-4">
          <h3 className="text-base font-semibold text-gray-900">{name}</h3>
          <p className="text-sm text-gray-600 mt-1">
            <span className="text-gray-500 font-medium">Exercises:</span> {content}
          </p>
          {lastCompleted && (
            <p className="text-sm text-gray-500 mt-2">Completed Last on: {lastCompleted}</p>
          )}
        </div>
        <div className="flex space-x-2">
          {isAllowCopy && (
            <button
              className="p-2 text-gray-400 hover:text-gray-600"
              onClick={() => onCopy(onRefetch)}
            >
              <CopyIcon className="h-5 w-5 stroke-[1.5]" />
            </button>
          )}
          {isAllowEdit && (
            <button className="p-2 text-gray-400 hover:text-gray-600" onClick={onEdit}>
              <PencilIcon className="h-5 w-5" />
            </button>
          )}
          {isAllowDelete && (
            <button className="p-2 text-gray-400 hover:text-red-600" onClick={onConfirmDelete}>
              <Trash2Icon className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>

      <div className="mt-3 pt-2 text-right">
        {isWorkoutSessionFinished ? (
          <div className="ml-auto flex w-fit items-center gap-2 text-sm text-primary">
            <CheckIcon className="w-4 h-4" />
            Finished
          </div>
        ) : (
          <Button
            variant="outline"
            size="sm"
            className="text-xs border-primary text-primary hover:bg-green-50 hover:text-primary"
            onClick={onPlay}
          >
            <PlayIcon className="h-3 w-3 mr-1" />
            Start
          </Button>
        )}
      </div>
    </Card>
  );
}
