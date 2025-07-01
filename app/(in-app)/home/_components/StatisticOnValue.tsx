import { ReactNode } from 'react';

export default function StatisticOnValue({
  title,
  children,
  loading,
}: {
  title: string;
  children: ReactNode;
  loading?: boolean;
}) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
      <h2 className="text-sm text-gray-600 mb-3">{title}</h2>
      <div className="grid grid-cols-3 gap-4">
        {loading ? (
          <>
            <div className="bg-gray-300 h-[52px] w-1/2 rounded animate-pulse" />
            <div className="bg-gray-300 h-[52px] w-1/2 rounded animate-pulse" />
            <div className="bg-gray-300 h-[52px] w-1/2 rounded animate-pulse" />
          </>
        ) : (
          children
        )}
      </div>
    </div>
  );
}
