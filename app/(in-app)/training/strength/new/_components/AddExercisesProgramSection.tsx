import { useState } from 'react';
import ExercisesProgramItem from './ExercisesProgramitem';

const initialExercises = [
  { name: 'Barbell Squat', description: 'Lower Body Strength' },
  { name: 'Bench Press', description: 'Upper Body Strength' },
  { name: 'Deadlift', description: 'Full Body Strength' },
  { name: 'Pull-ups', description: 'Upper Body Strength' },
];

export default function ExercisesProgramList() {
  const [exercises, setExercises] = useState(initialExercises);

  const handleRemove = (indexToRemove: number) => {
    setExercises(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="mb-6">
      <h2 className="text-primary font-medium mb-2">Added Exercises ({exercises.length})</h2>
      <div className="bg-white rounded-lg shadow-sm">
        {exercises.map(({ name, description }, index) => (
          <div key={name + index} className="flex items-center justify-between border-b">
            <div className="flex items-center w-full">
              <ExercisesProgramItem name={name} description={description} />
            </div>
            <button
              onClick={() => handleRemove(index)}
              className="text-red-600 p-2"
              aria-label={`Remove ${name}`}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 12H19"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
