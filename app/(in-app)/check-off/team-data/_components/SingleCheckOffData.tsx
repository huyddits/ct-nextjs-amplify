import { CheckOffTask } from '@/api/types/checkOff';
import { differenceInDays, format } from 'date-fns';

type Props = {
  data: CheckOffTask;
};
export function SingleCheckOffData({ data }: Props) {
  return (
    <div className="border rounded-lg overflow-hidden bg-white">
      <div className="bg-[#257951] text-white px-4 py-2 flex justify-between items-center">
        <h3 className="font-medium">{data.assigned_task}</h3>
      </div>
      <div className="p-4 space-y-4">
        <div className="space-y-3">
          <div>
            <h4 className="text-sm font-medium text-gray-500">Date Developed</h4>
            <p className="text-sm">{format(data.assigned_date, 'MM/dd/yyyy')}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500">Due Date</h4>
            <p className="text-sm">{format(data.due_date, 'MM/dd/yyyy')}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500"># Days Open</h4>
            <p className="text-sm">{differenceInDays(data.due_date, data.assigned_date)}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500">Notes/Comments</h4>
            <p className="text-sm">{data.notes}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500">Assigned to</h4>
            <p className="text-sm">{data.assigned_to.join(', ')}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500">Completed</h4>
            <p className="text-sm text-[#257951]">{data.completed.join(', ')}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500">Not Complete</h4>
            <p className="text-sm text-red-600">{data.not_complete.join(', ')}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500">Excused</h4>
            <p className="text-sm text-gray-500">{data.excused.join(', ')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
