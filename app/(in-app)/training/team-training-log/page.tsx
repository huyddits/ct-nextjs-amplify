'use client';
import { LogData, TableHeader, TableSkeleton } from './_components';
import { useTrainingLog } from './_hooks';

export default function TeamTrainingLogPage() {
  const { data, isLoading } = useTrainingLog();

  return (
    <div className="pt-[56px] pb-[80px]">
      <div className="max-w-3xl mx-auto overflow-x-auto">
        <table className="w-full bg-white">
          <thead>
            <TableHeader />
          </thead>
          <tbody>
            {isLoading ? (
              <TableSkeleton />
            ) : (
              <LogData athletes={data?.athletes} teamAverages={data?.teamAverages} />
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
