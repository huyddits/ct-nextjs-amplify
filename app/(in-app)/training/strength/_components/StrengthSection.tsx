import { type ProgramItem } from '../_hooks';
import { StrengthCard } from '.';

export default function ProgramGroupSection({ listPrograms }: { listPrograms: ProgramItem[] }) {
  return (
    <section>
      <div className="space-y-4">
        {listPrograms.map(item => (
          <StrengthCard
            key={item.id}
            id={item.id}
            content={item.name}
            name={item.name}
            lastCompleted={item.finishedAt}
          />
        ))}
      </div>
    </section>
  );
}
