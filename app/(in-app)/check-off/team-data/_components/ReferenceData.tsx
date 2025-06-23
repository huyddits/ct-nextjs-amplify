'use client';
import React from 'react';
import { Loader2Icon } from 'lucide-react';
import { useCheckOffReference } from '../_hooks';

type Props = {
  selectedDate?: string;
};

export function ReferenceData({ selectedDate }: Props) {
  const { data, isValidating } = useCheckOffReference(selectedDate);
  return (
    <div className="relative overflow-x-auto">
      {isValidating ? (
        <div className="flex justify-center items-center py-10">
          <Loader2Icon className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : !data?.length ? (
        <div className="text-center text-gray-500 py-10">No reference data found.</div>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#257951] text-white">
              <th className="sticky left-0 z-10 bg-[#257951] py-2 px-4 text-left font-medium min-w-[120px]">
                Name
              </th>
              <th className="py-2 px-4 text-left font-medium min-w-[100px]">Month</th>
              <th className="py-2 px-4 text-left font-medium min-w-[100px]">Week 1</th>
              <th className="py-2 px-4 text-left font-medium min-w-[100px]">Week 2</th>
              <th className="py-2 px-4 text-left font-medium min-w-[100px]">Week 3</th>
              <th className="py-2 px-4 text-left font-medium min-w-[100px]">Week 4</th>
            </tr>
          </thead>
          <tbody>
            {data.map((athlete, index) => (
              <tr key={athlete.name} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
                <td
                  className={`sticky left-0 z-10 py-2 px-4 border-b ${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}`}
                >
                  {athlete.name}
                </td>
                <td className="py-2 px-4 border-b font-medium">{athlete.monthlyRate}%</td>
                {[athlete.week1, athlete.week2, athlete.week3, athlete.week4].map(
                  (week, weekIndex) => (
                    <td key={weekIndex} className="py-2 px-4 border-b">
                      {week}%
                    </td>
                  )
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
