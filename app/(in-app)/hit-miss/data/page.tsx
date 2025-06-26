'use client';

import { AppSelect } from '@/components/compose';
import { useMemo, useState } from 'react';
import { useDataHitMiss } from './_components';
import { Controller } from 'react-hook-form';

export default function DataPage() {
  const { control, hitMissRoutineList, selectedHitMissRoutines, summarySection, summaryGroup } =
    useDataHitMiss({
      onSuccess: () => {},
      onFailure: () => {},
    });

  const hitMissRoutineOptions = useMemo(() => {
    return hitMissRoutineList.map(item => ({
      label: item.name,
      value: item.routineId.toString(),
    }));
  }, [hitMissRoutineList]);

  return (
    <div className="padding-top-pagePast padding-bottom-pagePast max-w-3xl mx-auto px-4">
      <div className="mx-4 mt-6">
        <Controller
          control={control}
          name="routines"
          render={({ field, fieldState: { error } }) => (
            <AppSelect
              options={hitMissRoutineOptions}
              selectedValue={field.value}
              onChangeSelected={field.onChange}
              placeholder="Choose Routine"
              errorMessage={error?.message}
              fullWidth
            />
          )}
        />
      </div>

      <div className="mx-4 mt-4">
        <div className="w-full border border-gray-300 rounded-md p-3 text-center bg-white text-gray-700 font-medium break-all whitespace-pre-wrap">
          {selectedHitMissRoutines && <div>{selectedHitMissRoutines.name}</div>}
        </div>
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
            {summarySection && summarySection.sections.length > 0 ? (
              summarySection.sections.map((section, index) => (
                <tr
                  key={`${summarySection.routineId}-${section.sectionId}`}
                  className={`border-b border-gray-300 ${index % 2 === 1 ? 'bg-gray-50' : ''}`}
                >
                  <td className="p-2 font-medium break-all whitespace-pre-wrap">{section.name}</td>
                  <td className="p-2 text-center font-medium">{section.totalReps}</td>
                  <td className="p-2 text-center font-medium">{section.hitPercentage}%</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="p-4 text-center text-gray-500">
                  No data available
                </td>
              </tr>
            )}
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
            {summaryGroup && summaryGroup.sections.length > 0 ? (
              summaryGroup.sections.map((section, sectionIdx) =>
                section.groups.map((group, groupIdx) => (
                  <tr
                    key={`${summaryGroup.routineId}-${section.sectionId}-${group.groupId}`}
                    className={`border-b border-gray-300 ${
                      (sectionIdx + groupIdx) % 2 === 1 ? 'bg-gray-50' : ''
                    }`}
                  >
                    {groupIdx === 0 && (
                      <td
                        rowSpan={section.groups.length}
                        className="p-2 font-medium align-middle break-all whitespace-pre-wrap "
                      >
                        {section.name}
                      </td>
                    )}
                    <td className="p-2 text-center font-medium">{`Group ${groupIdx + 1}`}</td>
                    <td className="p-2 text-center font-medium">{group.totalReps}</td>
                    <td className="p-2 text-center font-medium">{group.hitPercentage}%</td>
                  </tr>
                ))
              )
            ) : (
              <tr>
                <td colSpan={4} className="p-4 text-center text-gray-500">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
