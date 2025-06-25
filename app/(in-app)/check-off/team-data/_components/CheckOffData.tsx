'use client';
import { useTeamDataCheckOff } from '../_hooks';
import { SingleCheckOffData } from './SingleCheckOffData';
import { CheckOffDateParams } from '@/api/types/checkOff';
import { LoaderWithIcon } from '@/components/ui/loader';

type Props = {
  selectedDate?: CheckOffDateParams;
};
export function CheckOffData({ selectedDate }: Props) {
  const { data, isValidating } = useTeamDataCheckOff(selectedDate);
  return (
    <section className="space-y-4">
      {isValidating ? (
        <LoaderWithIcon />
      ) : !data?.length ? (
        <div className="text-center text-gray-500 py-10">No check-off data found.</div>
      ) : (
        data.map((item, idx) => <SingleCheckOffData key={item.due_date + idx} data={item} />)
      )}
    </section>
  );
}
