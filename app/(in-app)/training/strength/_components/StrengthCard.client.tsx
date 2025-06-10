'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CopyIcon, PencilIcon, Trash2Icon, PlayIcon } from 'lucide-react';

interface StrengthCardProps {
  name: string;
  content: string;
  lastCompleted: string;
}
export default function StrengthCard({ name, content, lastCompleted }: StrengthCardProps) {
  return (
    <Card className="p-4 rounded-xl shadow-sm">
      <div className="flex justify-between items-start">
        <div className="flex-1 pr-4">
          <h3 className="text-base font-semibold text-gray-900">{name}</h3>
          <p className="text-sm text-gray-600 mt-1">
            <span className="text-gray-500 font-medium">Exercises:</span> {content}
          </p>
          <p className="text-sm text-gray-500 mt-2">Completed Last on: {lastCompleted}</p>
        </div>

        <div className="flex space-x-2">
          <button className="p-2 text-gray-400 hover:text-gray-600">
            <CopyIcon className="h-5 w-5 stroke-[1.5]" />
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-600">
            <PencilIcon className="h-5 w-5" />
          </button>
          <button className="p-2 text-gray-400 hover:text-red-600">
            <Trash2Icon className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="mt-3 pt-2 text-right">
        <Button
          variant="outline"
          size="sm"
          className="text-xs border-primary text-primary hover:bg-green-50 hover:text-primary"
        >
          <PlayIcon className="h-3 w-3 mr-1" />
          Start
        </Button>
      </div>
    </Card>
  );
}
