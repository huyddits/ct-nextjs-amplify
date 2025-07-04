'use client';

import AlertGroup from './AlertGroup';
import AppAlert from '@/components/compose/AppAlert';
import { Button } from '@/components/ui/button';
import { differenceInDays, format } from 'date-fns';
import { useDismissDashboardAlert } from '@/app/(in-app)/home/_hooks/useDashboardApi';
import { toast } from 'react-toastify';
import { SWRInfiniteResponse } from 'swr/infinite';

interface Alert {
  id?: string;
  name?: string;
  task?: string;
  dueDate?: string;
}

interface AlertListSectionProps {
  title: string;
  colorClass?: string;
  fetcherHook: (key: string) => SWRInfiniteResponse<any>;
  valuePrefix?: string;
  emptyText: string;
  fetchKey: string; // Optional key for fetcher hook
  isMeasurement?: boolean; // Optional
  alertType: 'checkoff_due' | 'past_due' | 'submitted' | 'recent_measurement';
}

export default function AlertListSection({
  title,
  colorClass,
  fetcherHook,
  valuePrefix = '',
  emptyText,
  fetchKey,
  isMeasurement,
  alertType,
}: AlertListSectionProps) {
  const { data, size, setSize, isLoading, isValidating, mutate: refetch } = fetcherHook(fetchKey);
  const { trigger: onDismissAlert } = useDismissDashboardAlert();
  // Check if data is empty
  const isEmpty = !data?.[0]?.data?.length;
  // Helper to get color class based on dueDate
  const getColorClass = (dueDate?: string) => {
    if (!dueDate) return '';

    const diff = Math.abs(differenceInDays(new Date(dueDate), new Date()));
    if (diff <= 2) return 'red';
    if (diff <= 4) return 'yellow';
    return 'green';
  };
  const handleDismiss = async (alert: any) => {
    if (!alertType || !alert.id) return;
    const payload: any = {
      alertType: alertType,
      alertRefId: alert.id,
      isPermanent: alertType !== 'checkoff_due',
    };
    if (alert.status) payload.status = alert.status;
    await onDismissAlert(payload, {
      onSuccess: () => {
        toast.success('Removed alert successfully');
        refetch();
      },
    });
  };

  return (
    <AlertGroup title={title} colorClass={colorClass}>
      {isLoading ? (
        <>
          {Array.from({ length: 3 }).map((_, index) => (
            <div className="animate-pulse bg-gray-300 h-[84px] rounded" key={index} />
          ))}
        </>
      ) : isEmpty ? (
        <div className="text-center text-gray-500 py-2">{emptyText}</div>
      ) : (
        <>
          {data?.map(page =>
            page?.data?.map((alert: Alert) => (
              <AppAlert
                key={alert?.id}
                name={alert?.name || '-'}
                content={isMeasurement ? (alert as any).measurement : (alert?.task ?? '-')}
                value={
                  isMeasurement
                    ? (alert as any).result
                    : `${valuePrefix}${valuePrefix ? ' ' : ''}${alert?.dueDate ? format(new Date(alert.dueDate), 'MMMM dd, yyyy') : ''}`
                }
                colorClass={colorClass ? colorClass : getColorClass(alert?.dueDate)}
                closable
                onDelete={() => handleDismiss(alert)}
              />
            ))
          )}
          {size < (data?.at(-1)?.meta?.totalPages || 0) && (
            <Button
              onClick={() => setSize(size + 1)}
              className="w-full"
              loading={isValidating}
              variant="secondary"
            >
              Load more
            </Button>
          )}
        </>
      )}
    </AlertGroup>
  );
}
