import { DashboardAlerts } from '@/api/types/dashboard';
import AlertGroup from './AlertGroup';
import { useDeletedAlertsStore } from '@/store';
import AppAlert from '@/components/compose/AppAlert';
import { useRole } from '@/hooks';
import { useMemo } from 'react';

type Props = {
  alerts?: DashboardAlerts;
  loading?: boolean;
};
export default function AlertSection({ alerts, loading }: Props) {
  const { isCoach } = useRole();
  const { deletedIds, deleteAlert } = useDeletedAlertsStore();

  const listItems = useMemo(
    () => [
      {
        title: 'Check-Offs due',
        content: [
          ...(alerts?.dueCheckoffs?.['1DayLeft']?.map(alert => ({
            name: alert.name,
            content: alert.task,
            value: `Due: ${alert.dueDate}`,
            id: alert.id ?? '',
            colorClass: 'red',
          })) || []),
          ...(alerts?.dueCheckoffs?.['3DaysLeft']?.map(alert => ({
            name: alert.name,
            content: alert.task,
            value: `Due: ${alert.dueDate}`,
            id: alert.id ?? '',
            colorClass: 'yellow',
          })) || []),
          ...(alerts?.dueCheckoffs?.['5DaysLeft']?.map(alert => ({
            name: alert.name,
            content: alert.task,
            value: `Due: ${alert.dueDate}`,
            id: alert.id ?? '',
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
          (alerts?.pastDue?.map(alert => ({
            name: alert.name,
            content: alert.task,
            value: `Due: ${alert.dueDate}`,
            id: alert.id ?? '',
          })) as any) || [],
        colorClass: 'red',
        closable: true,
      },
      {
        title: 'Submitted check-offs',
        content:
          (alerts?.submitted?.map(alert => ({
            name: alert.name,
            content: alert.task,
            value: `Due: ${alert.dueDate}`,
            id: alert.id ?? '',
          })) as any) || [],
        colorClass: 'green',
        closable: true,
      },
      {
        title: 'Recent measurements',
        content:
          (alerts?.recentMeasurements?.map(alert => ({
            name: alert.name,
            content: (alert as any).measurement,
            value: (alert as any).result,
            id: alert.id ?? '',
          })) as any) || [],
        colorClass: 'blue',
        closable: true,
      },
    ],
    [alerts, isCoach]
  );

  const visibleSections = listItems
    .map(section => ({
      ...section,
      content: section.content.filter(
        (item: { id: string }) => item.id && !deletedIds.has(item.id)
      ),
    }))
    .filter(section => section.content.length > 0);

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
            {visibleSections.map(section => (
              <AlertGroup key={section.title} title={section.title} colorClass={section.colorClass}>
                {section.content.map((alertItem: any) => (
                  <AppAlert
                    key={alertItem.id}
                    name={alertItem.name}
                    content={alertItem.content || '-'}
                    value={alertItem.value || '-'}
                    colorClass={alertItem.colorClass || section.colorClass}
                    closable={section.closable}
                    onDelete={() => deleteAlert(alertItem.id)}
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
