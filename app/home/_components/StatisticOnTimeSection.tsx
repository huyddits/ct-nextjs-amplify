import StatisticOnTime from './StatisticOnTime';
export default function StatisticOnTimeSection() {
  const listItems = [
    {
      appellation: 'Team Check-Off',
      statistic: [
        { value: 85, unit: 'Weekly' },
        { value: 82, unit: 'Monthly' },
      ],
      colorClass: 'text-green-500',
    },
    {
      appellation: 'Hit/Miss',
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
            <StatisticOnTime key={item.appellation} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
