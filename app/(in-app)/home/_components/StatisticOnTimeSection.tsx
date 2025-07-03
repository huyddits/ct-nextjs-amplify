'use client';
import { useRole } from '@/hooks';
import StatisticOnTime from './StatisticOnTime';

type Props = {
  teamCheckOff?: {
    weekly: number;
    monthly: number;
  };
  hitMiss?: {
    weekly_hit_percentage: number;
    total_hit_percentage: number;
  };
  loading?: boolean;
};
export default function StatisticOnTimeSection({ teamCheckOff, hitMiss, loading }: Props) {
  const { isCoach } = useRole();
  const listItems = [
    {
      title: isCoach ? 'Team Check-Off' : 'Check-Off',
      statistic: [
        { value: teamCheckOff?.weekly ?? 0, unit: 'Weekly' },
        { value: teamCheckOff?.monthly ?? 0, unit: 'Monthly' },
      ],
      colorClass: 'text-green-500',
    },
    {
      title: 'Hit/Miss',
      statistic: [
        { value: hitMiss?.weekly_hit_percentage ?? 0, unit: 'Weekly' },
        { value: hitMiss?.total_hit_percentage ?? 0, unit: 'Total' },
      ],
      colorClass: 'text-orange-500',
    },
  ];
  return (
    <section>
      <div className="mb-6">
        <div className="space-y-6">
          {listItems.map(item => (
            <StatisticOnTime
              key={item.title}
              title={item.title}
              colorClass={item.colorClass}
              loading={loading}
            >
              {item.statistic.map((stat, index) => (
                <div key={index}>
                  <div className={`text-2xl sm:text-3xl font-bold ${item.colorClass}`}>
                    {stat.value}%
                  </div>
                  <div className="text-xs text-gray-500">{stat.unit}</div>
                </div>
              ))}
            </StatisticOnTime>
          ))}
        </div>
      </div>
    </section>
  );
}
