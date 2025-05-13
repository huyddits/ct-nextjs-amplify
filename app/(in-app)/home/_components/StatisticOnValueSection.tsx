import StatisticOnValue from './StatisticOnValue';

export default function StatisticOnValueSection() {
  const listItems = [
    {
      title: 'Team Training Averages',
      statistic: [
        { name: 'Strength', value: 3.5, unit: 'Weekly' },
        { name: 'Cardios', value: 32, unit: 'Monthly' },
        { value: 224, unit: 'Minutes per week' },
      ],
      colorClass: 'text-green-800',
    },
  ];

  return (
    <section>
      <div className="mb-12">
        <div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-8">
          {listItems.map(item => (
            <StatisticOnValue key={item.title} title={item.title} colorClass={item.colorClass}>
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
