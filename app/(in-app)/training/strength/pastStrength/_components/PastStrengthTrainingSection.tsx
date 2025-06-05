'use client';

const mockLegDayData = [
  {
    title: 'Leg Day',
    date: 'January 24, 2025',
    exercises: [
      {
        name: 'Squat',
        sets: [
          { reps: 15, weight: 135, rpe: 7 },
          { reps: 15, weight: 225, rpe: 7 },
          { reps: 8, weight: 275, rpe: 7 },
          { reps: 8, weight: 275, rpe: 7 },
        ],
        note: 'Focus on depth and keeping chest up throughout movement',
      },
      {
        name: 'Leg Press',
        sets: [
          { reps: 15, weight: 135, rpe: 7 },
          { reps: 15, weight: 275, rpe: 7 },
          { reps: 15, weight: 275, rpe: 7 },
          { reps: 15, weight: 575, rpe: 9 },
        ],
        note: 'Last set push to failure with good form',
      },
      {
        name: 'Leg Extensions',
        sets: [
          { reps: 12, weight: 90, rpe: 6 },
          { reps: 12, weight: 110, rpe: 7 },
          { reps: 10, weight: 130, rpe: 8 },
        ],
        note: 'Pause at top of each rep for 1 second',
      },
      {
        name: 'Hamstring Curl',
        sets: [
          { reps: 12, weight: 70, rpe: 6 },
          { reps: 12, weight: 85, rpe: 7 },
          { reps: 10, weight: 100, rpe: 8 },
        ],
        note: 'Slow eccentric (3 seconds down) on each rep',
      },
    ],
  },

  {
    title: 'Leg Chest and Arms',
    date: 'January 22, 2025',
    exercises: [
      {
        name: 'Bench Press',
        sets: [
          { reps: 15, weight: 135, rpe: 7 },
          { reps: 15, weight: 225, rpe: 7 },
          { reps: 8, weight: 275, rpe: 7 },
          { reps: 8, weight: 275, rpe: 7 },
        ],
        note: 'Focus on depth and keeping chest up throughout movement',
      },
      {
        name: 'Leg Press',
        sets: [
          { reps: 15, weight: 135, rpe: 7 },
          { reps: 15, weight: 275, rpe: 7 },
          { reps: 15, weight: 275, rpe: 7 },
          { reps: 15, weight: 575, rpe: 9 },
        ],
        note: 'Last set push to failure with good form',
      },
      {
        name: 'Leg Extensions',
        sets: [
          { reps: 12, weight: 90, rpe: 6 },
          { reps: 12, weight: 110, rpe: 7 },
          { reps: 10, weight: 130, rpe: 8 },
        ],
        note: 'Pause at top of each rep for 1 second',
      },
      {
        name: 'Hamstring Curl',
        sets: [
          { reps: 12, weight: 70, rpe: 6 },
          { reps: 12, weight: 85, rpe: 7 },
          { reps: 10, weight: 100, rpe: 8 },
        ],
        note: 'Slow eccentric (3 seconds down) on each rep',
      },
    ],
  },
];

export default function LegDaySection() {
  return (
    <div>
      {mockLegDayData.map(item => (
        <div key={`${item.title}-${item.date}`} className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-xl font-bold">{item.title}</h2>
            <span className="text-sm text-gray-600">{item.date}</span>
          </div>

          {item.exercises.map(exercise => (
            <div key={`${exercise.name}`} className="mb-6">
              <h3 className="font-semibold mb-2">{exercise.name}</h3>
              {exercise.sets.map((set, setIndex) => (
                <div key={setIndex} className="grid grid-cols-3 gap-2 mb-1">
                  <div className="text-sm text-gray-600">Set {setIndex + 1}:</div>
                  <div>
                    {set.reps} x {set.weight} lbs
                  </div>
                  <div className="text-right">RPE: {set.rpe}</div>
                </div>
              ))}
              <div className="text-sm text-gray-600 italic pb-2 border-b">
                Note: {exercise.note}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
