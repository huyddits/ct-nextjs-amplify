import { ReactNode } from 'react';

export default function WeeklyWorkoutsItem({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="bg-white rounded-lg shadow p-4 mb-4">
      <div className="mb-3">
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>
      <div className="space-y-4 text-sm">{children}</div>
    </div>
  );
}
