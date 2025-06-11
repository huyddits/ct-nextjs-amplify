import { type ProgramItem } from '../_hooks';
import { ProgramCard } from '.';

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
            content={item.name}
            name={item.name}
            lastCompleted={item.finishedAt}
            onRefetch={onRefetch}
          />
        ))}
      </div>
    </section>
  );
}
