import { ReactNode } from 'react';

export default function StatisticOnTime({
  title,
  colorClass,
  children,
  loading,
}: {
  title: string;
  colorClass: string;
  loading?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
      <h2 className="text-sm text-gray-600 mb-3">{title}</h2>
      <div className={`grid grid-cols-2 gap-4 ${colorClass}`}>
        {loading ? (
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-300 h-[52px] w-1/2 rounded animate-pulse" />
            <div className="bg-gray-300 h-[52px] w-2/3 rounded animate-pulse" />
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  );
}
