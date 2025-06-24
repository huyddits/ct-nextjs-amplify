'use client';
import { type ProgramItem } from '../_hooks';
import { ProgramCard } from '.';
import { DEFAULT_DATE_FORMAT } from '@/utils/formatter';
import { useLoadMore } from '@/hooks';
import { useRef } from 'react';
import { format, isValid, parseISO } from 'date-fns';

export default function ProgramSectionSection({
  page,
  loading,
  totalPages,
  listPrograms,
  onLoadMore,
  onRefetch,
}: {
  page: number;
  loading: boolean;
  totalPages: number;
  listPrograms: ProgramItem[];
  onRefetch?: () => void;
  onLoadMore: () => Promise<void>;
}) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { ref: sentinelRef } = useLoadMore({
    loadMore: onLoadMore,
    hasMore: page < totalPages,
    root: scrollContainerRef.current,
  });
  return (
    <section>
      <div className="space-y-4">
        {loading ? (
          <div className="flex items-center justify-center h-32">
            <div className="w-12 h-12 border-4 border-gray-300 border-t-primary rounded-full animate-spin" />
          </div>
        ) : !listPrograms.length ? (
          <div className="text-gray-600 text-center mt-16">No Programs found</div>
        ) : (
          listPrograms.map(item => (
            <ProgramCard
              key={item.id}
              id={item.id}
              content={item.exercises}
              name={item.name}
              lastCompleted={
                item.finishedAt
                  ? (() => {
                      const date = parseISO(item.finishedAt);
                      return isValid(date) ? format(date, `${DEFAULT_DATE_FORMAT}, h:mm a`) : '';
                    })()
                  : ''
              }
              onRefetch={onRefetch}
            />
          ))
        )}
        <div ref={sentinelRef} className="h-6" />
      </div>
    </section>
  );
}
