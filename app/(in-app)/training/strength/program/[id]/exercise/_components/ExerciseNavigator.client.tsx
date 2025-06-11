'use client';

import { Button } from '@/components/ui/button';
import { ArrowLeftIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

interface ExerciseNavigatorProps {
  showSwipeHint?: boolean;
  nextExerciseName?: string;
  previousExerciseName?: string;
  onNext?: () => void;
  onBack?: () => void;
}

export default function ExerciseNavigator({
  showSwipeHint,
  nextExerciseName,
  previousExerciseName,
  onNext,
  onBack,
}: ExerciseNavigatorProps) {
  return (
    <div className="flex text-primary text-base font-medium mb-4 relative w-full">
      {previousExerciseName && (
        <Button
          variant="ghost"
          onClick={onBack}
          className="flex items-center hover:text-primary"
          size="sm"
        >
          <ChevronLeftIcon className="h-4 w-4" />
          {previousExerciseName}
        </Button>
      )}

      {/* Swipe Hint */}
      {showSwipeHint && (
        <div className="absolute left-0 right-0 top-0 bottom-0 flex items-center justify-center pointer-events-none">
          <div className="bg-gray-100/90 px-3 py-1 rounded-full text-xs text-gray-600 flex items-center animate-pulse">
            <ChevronLeftIcon className="h-4 w-4 mr-1" />
            Swipe to navigate
            <ChevronRightIcon className="h-4 w-4 ml-1" />
          </div>
        </div>
      )}

      {nextExerciseName && (
        <Button
          variant="ghost"
          onClick={onNext}
          className="flex items-center ml-auto hover:text-primary"
          size="sm"
        >
          {nextExerciseName}
          <ChevronRightIcon className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
