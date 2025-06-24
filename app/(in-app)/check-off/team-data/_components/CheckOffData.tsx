'use client';
import { Loader2Icon } from 'lucide-react';
import { useTeamDataCheckOff } from '../_hooks';
import { SingleCheckOffData } from './SingleCheckOffData';
import { CheckOffDateParams } from '@/api/types/checkOff';

type Props = {
  selectedDate?: CheckOffDateParams;
};
export function CheckOffData({ selectedDate }: Props) {
  const { data, isValidating } = useTeamDataCheckOff(selectedDate);
  return (
    <section className="space-y-4">
      {isValidating ? (
        <div className="flex justify-center items-center py-10">
          <Loader2Icon className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : !data?.length ? (
        <div className="text-center text-gray-500 py-10">No check-off data found.</div>
      ) : (
        data.map((item, idx) => <SingleCheckOffData key={item.due_date + idx} data={item} />)
      )}
    </section>
  );
}
