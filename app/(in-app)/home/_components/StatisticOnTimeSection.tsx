import StatisticOnTime from './StatisticOnTime';

type Props = {
  teamCheckOff?: {
    weekly: number;
    monthly: number;
  };
  hitMiss?: {
    weekly: number;
    total: number;
  };
  loading?: boolean;
};
export default function StatisticOnTimeSection({ teamCheckOff, hitMiss, loading }: Props) {
  const listItems = [
    {
      title: 'Team Check-Off',
      statistic: [
        { value: teamCheckOff?.weekly ?? 0, unit: 'Weekly' },
        { value: teamCheckOff?.monthly ?? 0, unit: 'Monthly' },
      ],
      colorClass: 'text-green-500',
    },
    {
      title: 'Hit/Miss',
      statistic: [
        { value: hitMiss?.weekly ?? 0, unit: 'Weekly' },
        { value: hitMiss?.total ?? 0, unit: 'Total' },
      ],
      colorClass: 'text-orange-500',
    },
  ];
  return (
    <section>
      <div className="mb-12">
        <div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-8">
          {listItems.map(item => (
            <StatisticOnTime
              key={item.title}
              title={item.title}
              colorClass={item.colorClass}
              loading={loading}
            >
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
