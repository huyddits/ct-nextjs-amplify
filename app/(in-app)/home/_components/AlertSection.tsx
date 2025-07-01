import { DashboardAlerts } from '@/api/types/dashboard';
import AlertGroup from './AlertGroup';
import AppAlert from '@/components/compose/AppAlert';
import { useRole } from '@/hooks';
import { useMemo } from 'react';

type Props = {
  alerts?: DashboardAlerts;
  loading?: boolean;
};
export default function AlertSection({ alerts, loading }: Props) {
  const { isCoach } = useRole();

  // Map alerts data to the expected format
  const listItems = useMemo(
    () => [
      {
        title: 'Check-Offs due',
        content: [
          ...(alerts?.dueCheckoff?.['1DayLeft']?.map(alert => ({
            name: alert.name,
            content: alert.task,
            value: alert.dueDate,
            colorClass: 'red',
          })) || []),
          ...(alerts?.dueCheckoff?.['3DaysLeft']?.map(alert => ({
            name: alert.name,
            content: alert.task,
            value: alert.dueDate,
            colorClass: 'orange',
          })) || []),
          ...(alerts?.dueCheckoff?.['5DaysLeft']?.map(alert => ({
            name: alert.name,
            content: alert.task,
            value: alert.dueDate,
            colorClass: 'green',
          })) || []),
        ],
        colorClass: 'yellow',
        closable: true,
        disabled: isCoach,
      },
      {
        title: 'Past-due check-offs',
        content:
          alerts?.pastDue?.map(alert => ({
            name: alert.name,
            content: alert.task,
            value: alert.dueDate,
          })) || [],
        colorClass: 'red',
        closable: true,
      },
      {
        title: 'Submitted check-offs',
        content:
          alerts?.submitted?.map(alert => ({
            name: alert.name,
            content: alert.task,
            value: alert.dueDate,
          })) || [],
        colorClass: 'green',
        closable: true,
      },
      {
        title: 'Recent measurements',
        content:
          alerts?.recentMeasurements?.map(alert => ({
            name: alert.name,
            content: alert.task,
            value: alert.dueDate,
          })) || [],
        colorClass: 'blue',
        closable: true,
      },
    ],
    [alerts, isCoach]
  );
  return (
    <section>
      <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
        <div className="mb-12">
          <h2 className="font-semibold mb-3">Alerts</h2>

          <div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-8">
            {loading && (
              <div className="space-y-2">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div className="animate-pulse bg-gray-300 h-[84px] rounded" key={index} />
                ))}
              </div>
            )}
            {listItems
              .filter(item => item.content.length > 0) // Only show sections with content
              .map(item => (
                <AlertGroup key={item.title} title={item.title} colorClass={item.colorClass}>
                  {item.content.map((alertItem, idx) => (
                    <AppAlert
                      key={idx}
                      name={alertItem.name}
                      content={alertItem.content || '-'}
                      value={alertItem.value || '-'}
                      colorClass={item.colorClass}
                      closable={item.closable}
                    />
                  ))}
                </AlertGroup>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
