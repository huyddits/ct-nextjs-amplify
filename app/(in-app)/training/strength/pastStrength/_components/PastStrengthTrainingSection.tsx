'use client';

import { StrengthPastTrainingDataDateGroup } from '@/api/types/strength';
import { Loader2Icon } from 'lucide-react';
import React from 'react';
import { format } from 'date-fns';

type Props = {
  data?: StrengthPastTrainingDataDateGroup[];
  isLoading?: boolean;
};
export default function LegDaySection({ data, isLoading }: Props) {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-10">
        <div className="animate-spin">
          <Loader2Icon className="h-8 w-8 text-primary" />
        </div>
        <span className="ml-2 text-gray-500">Loading past strength training data...</span>
      </div>
    );
  }
  if (!data?.length) {
    return (
      <div className="text-center text-gray-500 py-10">No past strength training data found.</div>
    );
  }
  return (
    <div>
      {data?.map(day => (
        <React.Fragment key={day.date}>
          {day.programs.map(program => (
            <div
              key={day.date + program.program_id}
              className="bg-white rounded-lg shadow p-4 mb-6"
            >
              <div className="flex justify-between items-center mb-3 gap-4">
                <h2 className="text-lg md:text-xl font-bold truncate">{program.program_name}</h2>
                <span className="text-sm text-gray-600 flex-shrink-0">
                  {format(day.date, 'MMMM d, yyyy')}
                </span>
              </div>
              <div>
                {program.exercises
                  .filter(exercise => exercise.training_data.sets.length)
                  .map(exercise => (
                    <div key={exercise.program_exercise_id} className="pb-2 pt-4 md:pt-6 border-b">
                      <h3 className="font-semibold mb-2">{exercise.exercise_name}</h3>
                      {exercise.training_data.sets?.map((set, setIndex) => (
                        <div key={setIndex} className="grid grid-cols-3 gap-2 mb-1">
                          <div className="text-sm text-gray-600">Set {setIndex + 1}:</div>
                          <div>
                            {set.rep ?? 0} x {set.weight ?? 0} lbs
                          </div>
                          <div className="text-right">RPE: {set.rpe}</div>
                        </div>
                      ))}
                      {!!exercise.training_data.note && (
                        <div className="text-sm text-gray-600 italic">
                          Note: {exercise.training_data.note}
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </React.Fragment>
      ))}
    </div>
  );
}
