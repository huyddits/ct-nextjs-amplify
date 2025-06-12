import { DEFAULT_DATE_FORMAT } from '@/utils/formatter';
import dayjs from 'dayjs';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import { useState } from 'react';

type ExercisePastWorkoutsProps = {
  pastWorkouts: {
    note: string;
    date: string;
    sets: {
      weight: number;
      reps: number;
      rpe: number;
    }[];
  }[];
};

export default function ExercisePastWorkouts({ pastWorkouts }: ExercisePastWorkoutsProps) {
  const [showAllPastWorkouts, setShowAllPastWorkouts] = useState(false);

  const [localIndex, setLocalIndex] = useState(2);

  console.log('pastWorkouts', pastWorkouts);

  const togglePastWorkoutsView = () => {
    setLocalIndex(100);
    setShowAllPastWorkouts(!showAllPastWorkouts);
  };
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <h2 className="font-medium mb-4">Past Workouts</h2>

      <div className="space-y-6">
        {pastWorkouts.slice(0, localIndex).map((workout, workoutIndex) => (
          <div key={workoutIndex}>
            <div className="flex items-center text-sm text-gray-500 mb-3">
              <span>{dayjs(workout.date).format(DEFAULT_DATE_FORMAT)}</span>
            </div>
            <div className="space-y-2">
              {workout.sets.map((set, setIndex) => (
                <div key={setIndex} className="grid grid-cols-3 text-sm">
                  <div>Set {setIndex + 1}</div>
                  <div className="text-center">
                    {set.weight} lb × {set.reps}
                  </div>
                  <div className="text-right">RPE {Math.round(set.rpe)}</div>
                </div>
              ))}
            </div>
            {workout.note && (
              <p className="text-sm text-gray-600 mt-2 border-l-2 border-gray-200 pl-3 italic">
                Note: {workout.note}
              </p>
            )}
          </div>
        ))}
      </div>

      {localIndex < pastWorkouts.length && (
        <button
          onClick={togglePastWorkoutsView}
          className="w-full text-primary font-medium mt-4 flex items-center justify-center"
        >
          {showAllPastWorkouts ? (
            <>
              <ChevronUpIcon className="h-4 w-4 mr-1" />
              Show less
            </>
          ) : (
            <>
              <ChevronDownIcon className="h-4 w-4 mr-1" />
              More past workouts
            </>
          )}
        </button>
      )}
    </div>
  );
}
