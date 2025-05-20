export default function WeeklyWorkoutsSection() {
  const listItems = [
    {
      title: 'Weekly Workouts',
      content: [
        {
          date: '1/20',
          type: 'Row',
          duration: '30 mins',
          distance: '4.2 km',
          rpe: '7',
          heartRate: '145 BPM',
          note: 'Felt strong during the session',
        },
        {
          date: '1/21',
          type: 'Bike',
          duration: '25 mins',
          stairs: '1000 stairs',
          rpe: '6',
          heartRate: '138 BPM',
          note: 'Slight fatigue today',
        },
      ],
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-4">
      {listItems.map((section, index) => (
        <div key={index}>
          <div className="mb-3">
            <h2 className="text-lg font-semibold">{section.title}</h2>
          </div>

          <div className="space-y-4 text-sm">
            {section.content.map((w, i) => (
              <div key={i} className={`${i < section.content.length - 1 ? 'border-b pb-4' : ''}`}>
                <div className="mb-2">
                  <span className="text-gray-600">{w.date}</span>
                  <span className="mx-1">-</span>
                  <span className="font-medium text-[#257951]">{w.type}</span>
                </div>

                <div className="space-y-1 mb-2">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Duration:</span>
                    <span>{w.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">{w.distance ? 'Distance:' : 'Stairs:'}</span>
                    <span>{w.distance || w.stairs}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">RPE:</span>
                    <span>{w.rpe}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Heart Rate:</span>
                    <span>{w.heartRate}</span>
                  </div>
                </div>

                {w.note && (
                  <div className="bg-gray-50 p-2 rounded">
                    <span className="text-gray-500">Note: </span>
                    <span className="text-gray-700">{w.note}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
