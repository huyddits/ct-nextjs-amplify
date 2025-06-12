import { type ProgramItem } from '../_hooks';
import { ProgramCard } from '.';
import dayjs from 'dayjs';
import { DEFAULT_DATE_FORMAT } from '@/utils/formatter';

export default function ProgramSectionSection({
  listPrograms,
  onRefetch,
}: {
  listPrograms: ProgramItem[];
  onRefetch?: () => void;
}) {
  return (
    <section>
      <div className="space-y-4">
        {listPrograms.map(item => (
          <ProgramCard
            key={item.id}
            id={item.id}
            content={item.exercises}
            name={item.name}
            lastCompleted={
              item.finishedAt ? dayjs(item.finishedAt).format(DEFAULT_DATE_FORMAT + ', h:mm A') : ''
            }
            onRefetch={onRefetch}
          />
        ))}
      </div>
    </section>
  );
}
