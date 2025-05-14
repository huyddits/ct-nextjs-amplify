import StatisticOnValue from './StatisticOnValue';
export default function StatisticOnTimeSection() {
  const listItems = [
    {
      appellation: 'Team Training Averages',

      statistic: [
        { title: 'Strength', value: 3.5, unit: 'Weekly' },
        { title: 'Cardios', value: 32, unit: 'Monthly' },
        { title: '', value: 224, unit: 'Minutes per week' },
      ],
      colorClass: 'text-green-800',
    },
  ];
  return (
    <section>
      <div className="mb-12">
        <div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-8">
          {listItems.map(item => (
            <StatisticOnValue key={item.appellation} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
