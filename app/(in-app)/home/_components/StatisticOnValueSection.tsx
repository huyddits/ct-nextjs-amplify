'use client';
import { useRole } from '@/hooks/useRole';
import StatisticOnValue from './StatisticOnValue';

type Props = {
  teamTrainingAverages?: {
    strength: number;
    cardio: number;
    minutesPerWeek: number;
  };
  loading?: boolean;
};
export default function StatisticOnValueSection({ teamTrainingAverages, loading }: Props) {
  const { isCoach } = useRole();
  const listItems = [
    {
      title: isCoach ? 'Team Training Averages' : 'Training Averages',
      statistic: [
        { name: 'Strength', value: teamTrainingAverages?.strength ?? 0, unit: 'Days per week' },
        { name: 'Cardios', value: teamTrainingAverages?.cardio ?? 0, unit: 'Minutes per day' },
        { value: teamTrainingAverages?.minutesPerWeek ?? 0, unit: 'Minutes per week' },
      ],
      colorClass: 'text-green-800',
    },
  ];

  return (
    <section>
      <div className="mb-6">
        <div className="space-y-6">
          {listItems.map(item => (
            <StatisticOnValue key={item.title} title={item.title} loading={loading}>
              {item.statistic.map((stat, index) => (
                <div key={index}>
                  <div className="text-sm font-medium text-gray-700 min-h-[20px]">{stat.name}</div>
                  <div
                    className={`text-[22px] sm:text-2xl font-bold ${item.colorClass} min-h-[36px]`}
                  >
                    {stat.value != null ? `${stat.value}` : ''}
                  </div>
                  <div className="text-xs text-gray-500 min-h-[20px]">{stat.unit}</div>
                </div>
              ))}
            </StatisticOnValue>
          ))}
        </div>
      </div>
    </section>
  );
}
