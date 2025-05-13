import StatisticOnTime from './StatisticOnTime';
export default function StatisticOnTimeSection() {
  const listItems = [
    {
      title: 'Team Check-Off',
      statistic: [
        { value: 85, unit: 'Weekly' },
        { value: 82, unit: 'Monthly' },
      ],
      colorClass: 'text-green-500',
    },
    {
      title: 'Hit/Miss',
      statistic: [
        { value: 78, unit: 'Weekly' },
        { value: 75, unit: 'Total' },
      ],
      colorClass: 'text-orange-500',
    },
  ];
  return (
    <section>
      <div className="mb-12">
        <div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-8">
          {listItems.map(item => (
            <StatisticOnTime key={item.title} title={item.title} colorClass={item.colorClass}>
              <div className="grid grid-cols-2 gap-4">
                {item.statistic.map((stat, index) => (
                  <div key={index}>
                    <div className={`text-3xl font-bold ${item.colorClass}`}>{stat.value}%</div>
                    <div className="text-xs text-gray-500">{stat.unit}</div>
                  </div>
                ))}
              </div>
            </StatisticOnTime>
          ))}
        </div>
      </div>
    </section>
  );
}
