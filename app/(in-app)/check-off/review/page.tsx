'use client';

import { useGetCheckOffStudentReview } from './_hooks/useGetCheckOffStudentReview';
import { CheckOffStudentReview } from '@/api/types/checkOff';
import { CheckOffCard } from './_components';
import { Loader2Icon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useMemo } from 'react';

export default function CheckOffStudent() {
  const {
    data,
    isLoading,
    setSize,
    size,
    isValidating,
    mutate: refetch,
  } = useGetCheckOffStudentReview();

  useEffect(() => {
    return () => {
      setSize(1);
    };
  }, []);
  const isEmpty = useMemo(() => !data?.[0]?.data?.length, [data]);

  return (
    <div className="padding-top-pagePast padding-bottom-pagePast max-w-3xl mx-auto px-4">
      <div className="space-y-8">
        {isLoading ? (
          <div className="flex justify-center items-center py-10">
            <Loader2Icon className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : isEmpty ? (
          <div className="text-center text-gray-500 py-10">No check-off data found.</div>
        ) : (
          <>
            {data?.map(page =>
              page.data?.map((checkOff: CheckOffStudentReview) => (
                <CheckOffCard key={checkOff.submit_id} data={checkOff} onSubmit={refetch} />
              ))
            )}
            {(size < (data?.[data.length - 1]?.meta?.totalPages || 0) || isValidating) && (
              <Button
                onClick={() => setSize(size + 1)}
                className="w-full"
                loading={isValidating}
                variant="default"
              >
                Load More
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
