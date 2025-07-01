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
  const listItems = [
    {
      title: 'Team Training Averages',
      statistic: [
        { name: 'Strength', value: teamTrainingAverages?.strength ?? 0, unit: 'Weekly' },
        { name: 'Cardios', value: teamTrainingAverages?.cardio ?? 0, unit: 'Monthly' },
        { value: teamTrainingAverages?.minutesPerWeek ?? 0, unit: 'Minutes per week' },
      ],
      colorClass: 'text-green-800',
    },
  ];

  return (
    <section>
      <div className="mb-12">
        <div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-8">
          {listItems.map(item => (
            <StatisticOnValue key={item.title} title={item.title} loading={loading}>
              {item.statistic.map((stat, index) => (
                <div key={index}>
                  <div className="text-sm font-medium text-gray-700 min-h-[20px]">{stat.name}</div>
                  <div className={`text-2xl font-bold ${item.colorClass} min-h-[36px]`}>
                    {stat.value != null ? `${stat.value}%` : ''}
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
