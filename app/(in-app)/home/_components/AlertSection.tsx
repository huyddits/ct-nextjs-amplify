'use client';

import AlertGroup from './AlertGroup';
import AppAlert from '@/components/compose/AppAlert';
import { LoaderWithIcon } from '@/components/ui/loader';
import { Button } from '@/components/ui/button';

interface Alert {
  id?: string;
  name?: string;
  task?: string;
  dueDate?: string;
}

interface AlertSectionProps {
  title: string;
  colorClass: string;
  data: any[] | undefined;
  size: number;
  setSize: (size: number) => void;
  isLoading: boolean;
  isEmpty: boolean;
  valuePrefix?: string;
  loadingText: string;
  emptyText: string;
  isMeasurement?: boolean; // Optional prop for measurement alerts
}

export default function AlertSection({
  title,
  colorClass,
  data,
  size,
  setSize,
  isLoading,
  isEmpty,
  valuePrefix = '',
  loadingText,
  emptyText,
  isMeasurement,
}: AlertSectionProps) {
  return (
    <AlertGroup title={title} colorClass={colorClass}>
      {isLoading ? (
        <LoaderWithIcon text={loadingText} />
      ) : isEmpty ? (
        <div className="text-center text-gray-500 py-2">{emptyText}</div>
      ) : (
        <>
          {data?.map(page =>
            page?.map((alert: Alert) => (
              <AppAlert
                key={alert?.id}
                name={alert?.name || ''}
                content={isMeasurement ? (alert as any).measurement : alert?.task}
                value={
                  isMeasurement
                    ? (alert as any).result
                    : `${valuePrefix}${valuePrefix ? ' ' : ''}${alert?.dueDate || ''}`
                }
                colorClass={colorClass}
                closable
              />
            ))
          )}
          {data && data.length > 0 && (
            <Button
              onClick={() => setSize(size + 1)}
              className="w-full mt-2"
              loading={isLoading}
              disabled={size >= (data?.at(-1)?.meta?.totalPages || 0)}
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
