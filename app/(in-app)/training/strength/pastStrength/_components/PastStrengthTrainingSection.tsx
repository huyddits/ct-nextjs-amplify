'use client';

import { StrengthPastTrainingDataDateGroup } from '@/api/types/strength';
import React from 'react';

type Props = {
  data?: StrengthPastTrainingDataDateGroup[];
};
export default function LegDaySection({ data }: Props) {
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
              <div className="flex justify-between items-center mb-3 gap-2">
                <h2 className="text-lg md:text-xl font-bold truncate">{program.program_name}</h2>
                <span className="text-sm text-gray-600">
                  {new Date(day.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </div>
              <div>
                {program.exercises.map(exercise => (
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
