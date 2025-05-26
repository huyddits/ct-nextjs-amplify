'use client';
import { useMemo } from 'react';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import { usePastCardioTraining } from '../_hooks';
export default function WeeklyWorkoutsSection({ selectedDate }: Readonly<{ selectedDate: Date }>) {
  dayjs.extend(isoWeek);
  const from = useMemo(() => {
    return dayjs(selectedDate).startOf('isoWeek').format('YYYY-MM-DD');
  }, [selectedDate]);

  const to = useMemo(() => {
    return dayjs(selectedDate).endOf('isoWeek').format('YYYY-MM-DD');
  }, [selectedDate]);

  const { weeklyWorkoutItems } = usePastCardioTraining({ from, to });

  if (!weeklyWorkoutItems) {
    return <div className="bg-white rounded-lg shadow p-4 mb-4"></div>;
  }

  const listItems = [
    {
      title: 'Weekly Workouts',
      content: weeklyWorkoutItems.map(data => ({
        date: `${data.date}`,
        type: `${data.duration}`,
        duration: `${data.distance}`,
        distance: `${data.rpe}`,
        stairs: `${data.stairs}`,
        rpe: `${data.heart_rate_min}`,
        heartRate: `${data.heart_rate_max}`,
        note: `${data.notes}`,
      })),
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
                  <span className="font-medium text-primary">{w.type}</span>
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
