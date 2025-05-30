'use client';
export default function WeeklyWorkoutsSection({
  weeklyWorkoutItems,
}: Readonly<{ weeklyWorkoutItems: any }>) {
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
            {section.content.map((w: any) => {
              return (
                <div key={`${w.date} ${w.name}`} className={` 'border-b pb-4' : ''}`}>
                  <div className="mb-2">
                    <span className="text-gray-600">{w.date}</span>
                    {w.name && (
                      <>
                        <span className="mx-1">-</span>
                        <span className="font-medium text-primary">{w.name}</span>
                      </>
                    )}
                  </div>

                  <div className="space-y-1 mb-2">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Duration:</span>
                      <span>{w.duration != null ? `${w.duration} mins` : '-'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">
                        {w.unit === 'Stairs' ? 'Stairs:' : 'Distance:'}
                      </span>
                      <span>{w.distance != null ? `${w.distance} ${w.unit}` : '-'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">RPE:</span>
                      <span>{w.rpe != null ? `${w.rpe} RPE` : '-'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Heart Rate:</span>
                      {w.heartRate != null ? `${w.heartRate} bpm` : '-'}
                    </div>
                  </div>

                  {w.notes && (
                    <div className="bg-gray-50 p-2 rounded">
                      <span className="text-gray-500">Note: </span>
                      <span className="text-gray-700">{w.notes}</span>
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
