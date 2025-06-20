'use client';

import { useGetCheckOffStudentReview } from './_hooks/useGetCheckOffStudentReview';
import { CheckOffStudentReview } from '@/api/types/checkOff';
import { CheckOffCard } from './_components';
import { Loader2Icon } from 'lucide-react';
import { useState } from 'react';

export default function CheckOffStudent() {
  const [limit, setLimit] = useState(10);
  const { data, isLoading } = useGetCheckOffStudentReview({ page: 1, limit });

  return (
    <div className="padding-top-pagePast padding-bottom-pagePast max-w-3xl mx-auto px-4">
      <div className="space-y-8">
        {isLoading ? (
          <div className="flex justify-center items-center py-10">
            <Loader2Icon className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : !data?.length ? (
          <div className="text-center text-gray-500 py-10">No check-off data found.</div>
        ) : (
          data.map((checkOff: CheckOffStudentReview) => (
            <CheckOffCard key={checkOff.submit_id} data={checkOff} />
          ))
        )}
      </div>
    </div>
  );
}
