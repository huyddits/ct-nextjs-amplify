'use client';

import { WeeklyWorkouts } from '../_types';

export default function WeeklyWorkoutsSection({
  weeklyWorkoutItems,
}: Readonly<{ weeklyWorkoutItems: WeeklyWorkouts[] }>) {
  const listItems = [
    {
      title: 'Weekly Workouts',
      content: weeklyWorkoutItems,
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-4">
      {listItems.map(section => (
        <div key={section.title}>
          <div className="mb-3">
            <h2 className="text-lg font-semibold">{section.title}</h2>
          </div>

          <div className="space-y-4 text-sm">
            {section.content.length &&
              section.content.map((item: WeeklyWorkouts, index: number) => {
                return (
                  <div key={String(index)} className={` 'border-b pb-4' : ''}`}>
                    <div className="mb-2">
                      <span className="text-gray-600">{item.date}</span>
                      {item.name && (
                        <>
                          <span className="mx-1">-</span>
                          <span className="font-medium text-primary">{item.name}</span>
                        </>
                      )}
                    </div>

                    <div className="space-y-1 mb-2">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Duration:</span>
                        <span>{item.duration != null ? `${item.duration} mins` : '-'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">
                          {item.unit === 'Stairs' ? 'Stairs:' : 'Distance:'}
                        </span>
                        <span>{item.distance != null ? `${item.distance} ${item.unit}` : '-'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">RPE:</span>
                        <span>{item.rpe != null ? `${item.rpe} RPE` : '-'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Heart Rate:</span>
                        {item.heartRate != null ? `${item.heartRate} bpm` : '-'}
                      </div>
                    </div>

                    {item.notes && (
                      <div className="bg-gray-50 p-2 rounded">
                        <span className="text-gray-500">Note: </span>
                        <span className="text-gray-700">{item.notes}</span>
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      ))}
    </div>
  );
}
