import { ReactNode } from 'react';

export default function StatisticOnValue({
  title,
  colorClass,
  children,
}: {
  title: string;
  colorClass: string;
  children: ReactNode;
}) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
      <h2 className="text-sm text-gray-600 mb-3">{title}</h2>
      <div className="grid grid-cols-3 gap-4">{children}</div>
    </div>
  );
}
