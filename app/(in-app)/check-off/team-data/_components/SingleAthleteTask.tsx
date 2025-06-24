import { CheckOffByAthleteItem, CheckOffStatusEnum } from '@/api/types/checkOff';
import { cn } from '@/lib/utils';
import { useMemo } from 'react';
type Props = {
  data: CheckOffByAthleteItem;
};

export function SingleAthleteTask({ data }: Props) {
  const reviewStatusInfo = useMemo(() => {
    switch (data.status) {
      case CheckOffStatusEnum.Completed:
        return {
          status: 'Completed',
          className: 'bg-primary text-white',
        };
      case CheckOffStatusEnum.NotCompleted:
        return {
          status: 'Not Completed',
          className: 'bg-destructive text-white',
        };
      case CheckOffStatusEnum.Excused:
        return {
          status: 'Excused',
          className: 'bg-primary text-white',
        };
      default:
        return {
          status: '',
          className: 'bg-yellow-200',
        };
    }
  }, [data]);

  const dateSubmittedInfo = useMemo(() => {
    if (data.submitted_date) {
      return {
        status: data.submitted_date,
        className: 'bg-primary text-white',
      };
    }
    const now = new Date();
    if (data.due_date && new Date(data.due_date) < now) {
      return { status: 'Did Not Submit', className: 'bg-destructive text-white' };
    }
    return { status: 'Not Submitted Yet', className: 'bg-yellow-200' };
  }, [data]);

  return (
    <div className="border-t-4 border-black">
      <div className="grid grid-cols-2">
        <div className="py-1 px-3 border-r">Check-Off Task</div>
        <div className="py-1 px-3">{data.checkoff_name}</div>
      </div>
      <div className="grid grid-cols-2">
        <div className="py-1 px-3 border-r border-t">Due Date</div>
        <div className="py-1 px-3 border-t">{data.due_date}</div>
      </div>
      <div className={cn('grid grid-cols-2', dateSubmittedInfo.className)}>
        <div className="py-1 px-3 border-r border-t">Date Submitted</div>
        <div className="py-1 px-3 border-t">{dateSubmittedInfo.status}</div>
      </div>
      <div className={cn('grid grid-cols-2', reviewStatusInfo.className)}>
        <div className="py-1 px-3 border-r border-t">Status</div>
        <div className="py-1 px-3 border-t">{reviewStatusInfo.status}</div>
      </div>
      <div className="grid grid-cols-2">
        <div className="py-1 px-3 border-r border-t">Notes</div>
        <div className="py-1 px-3 border-t">{data.notes || '-'}</div>
      </div>
    </div>
  );
}
