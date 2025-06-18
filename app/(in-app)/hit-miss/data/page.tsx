'use client';

import { Button } from '@/components/ui/button';
import { ChevronDownIcon } from 'lucide-react';

export default function DataPage() {
  type GroupStat = {
    group: string;
    reps: number;
    hit: string;
  };

  type SectionStat = {
    name: string;
    groups: GroupStat[];
  };

  type Section = {
    name: string;
    reps: number;
    hit: string;
  };

  const sectionStats: Section[] = [
    { name: 'First Stunt Sequence', reps: 61, hit: '77%' },
    { name: 'Opening Back Tuck', reps: 50, hit: '75%' },
    { name: "1-1-1's", reps: 58.33, hit: '76.6%' },
    { name: 'Team Back Tuck', reps: 50, hit: '74%' },
    { name: 'Cheer', reps: 45, hit: '97.7%' },
    { name: 'Ending Stunt', reps: 49, hit: '81.1%' },
  ];

  const mockStats: SectionStat[] = [
    {
      name: 'First Stunt Sequence',
      groups: [
        { group: '1', reps: 55, hit: '74.5%' },
        { group: '2', reps: 67, hit: '85.1%' },
      ],
    },
    {
      name: 'Opening Back Tuck',
      groups: [{ group: '1', reps: 50, hit: '75%' }],
    },
    {
      name: "1-1-1's",
      groups: [
        { group: '1', reps: 50, hit: '100%' },
        { group: '2', reps: 60, hit: '75%' },
        { group: '3', reps: 65, hit: '60%' },
      ],
    },
    {
      name: 'Team Back Tuck',
      groups: [{ group: '1', reps: 50, hit: '74%' }],
    },
    {
      name: 'Cheer',
      groups: [{ group: '1', reps: 45, hit: '97.7%' }],
    },
    {
      name: 'Ending Stunt',
      groups: [
        { group: '1', reps: 46, hit: '71.7%' },
        { group: '2', reps: 50, hit: '74%' },
        { group: '3', reps: 52, hit: '96.2%' },
      ],
    },
  ];
  return (
    <div className="padding-top-pagePast padding-bottom-pagePast max-w-3xl mx-auto px-4">
      <div className="mx-4 mt-6">
        <div className="border border-[#257951] rounded-md p-3 flex justify-between items-center bg-white">
          <span className="text-gray-700 font-medium">Choose Routine</span>
          <ChevronDownIcon className="h-5 w-5 text-gray-700" />
        </div>
      </div>

      <div className="mx-4 mt-4">
        <Button className="w-full border border-gray-300 rounded-md p-3 text-center bg-white text-gray-700 font-medium">
          Routine 1
        </Button>
      </div>

      <div className="mx-4 mt-6 border border-primary rounded-md overflow-hidden">
        <table className="w-full text-sm text-gray-900">
          <thead>
            <tr>
              <th className="bg-primary text-white p-2 text-left">Section Name</th>
              <th className="bg-primary text-white p-2 text-center">Reps</th>
              <th className="bg-primary text-white p-2 text-center">% Hit</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {sectionStats.map((section, i) => (
              <tr
                key={section.name}
                className={`border-b border-gray-300 ${i % 2 === 1 ? 'bg-gray-50' : ''}`}
              >
                <td className="p-2 font-medium">{section.name}</td>
                <td className="p-2 text-center font-medium">{section.reps}</td>
                <td className="p-2 text-center font-medium">{section.hit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mx-4 mt-6 border border-primary rounded-md overflow-hidden">
        <table className="w-full text-sm text-gray-900">
          <thead>
            <tr>
              <th className="bg-primary text-white p-2 text-left">Section Name</th>
              <th className="bg-primary text-white p-2 text-center">Group</th>
              <th className="bg-primary text-white p-2 text-center">Reps</th>
              <th className="bg-primary text-white p-2 text-center">% Hit</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {mockStats.map((section, sectionIdx) =>
              section.groups.map((group, groupIdx) => (
                <tr
                  key={`${section.name}-${group.group}`}
                  className={
                    groupIdx % 2 === 1
                      ? 'bg-gray-50 border-b border-gray-300'
                      : 'border-b border-gray-300'
                  }
                >
                  {groupIdx === 0 && (
                    <td rowSpan={section.groups.length} className="p-2 font-medium align-top">
                      {section.name}
                    </td>
                  )}
                  <td className="p-2 text-center font-medium">{group.group}</td>
                  <td className="p-2 text-center font-medium">{group.reps}</td>
                  <td className="p-2 text-center font-medium">{group.hit}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
