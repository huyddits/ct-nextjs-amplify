'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { RefreshCw, Undo2 } from 'lucide-react';
import { useMemo } from 'react';
import { useConfirmStore } from '@/store';
import { Controller, useWatch } from 'react-hook-form';
import { useReportHitMiss } from './_hooks';
import { AppSelect } from '@/components/compose';

export default function ReportPage() {
  const { confirm } = useConfirmStore();
  const {
    control,
    hitMissRoutineList,
    hitMissCurrentList,
    onSubmit,
    onDelete,
    onSubmitComplete,
    isLoading,
  } = useReportHitMiss({
    onSuccess: () => {},
    onFailure: () => {},
  });

  const routineValue = useWatch({
    control,
    name: 'routines',
  });

  const handleReset = () => {
    confirm({
      title: 'WARNING!',
      description: 'Are you sure you want to reset? Your data will be saved in data screen',
      onConfirm: () => {
        onSubmitComplete('reset');
      },
    });
  };

  const hitMissRoutineOptions = useMemo(() => {
    return hitMissRoutineList.map(item => ({
      label: item.name,
      value: item.routineId.toString(),
    }));
  }, [hitMissRoutineList]);

  const calculateHitPercentage = (attempts: { type: string }[]) => {
    const total = attempts.length;
    const hits = attempts.filter(a => a.type === 'hit').length;
    return total === 0 ? 0 : Math.round((hits / total) * 100);
  };

  return (
    <div className="padding-top-pagePast padding-bottom-pagePast max-w-3xl mx-auto px-4">
      <div className="mt-4 space-y-4">
        {/* Reuse AppSelect always at the top */}
        <div className="text-center">
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

        {!routineValue ? (
          // --- Routine chưa chọn ---
          <div className="pt-10 items-center justify-center text-center">
            <div className="w-12 h-12 mx-auto rounded-full bg-green-100 flex items-center justify-center">
              <span className="text-green-600 text-3xl">↓</span>
            </div>

            <div className="mt-4">
              <h2 className="font-bold text-lg text-gray-800">Select a Routine to Begin</h2>
              <p className="text-sm text-gray-500 mt-1">
                Choose a routine from the dropdown above to start tracking your hit/miss statistics.
              </p>
            </div>

            <div className="flex flex-col items-center mt-4 space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-green-600" />
                <span className="text-gray-700">Green dots show successful hits</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-600" />
                <span className="text-gray-700">Red dots show misses</span>
              </div>
            </div>
          </div>
        ) : (
          // --- Routine đã chọn, hiển thị danh sách ---
          <>
            <div className="space-y-4">
              {hitMissCurrentList?.events.sections.map(section =>
                section.groups.map((group, groupIndex) => {
                  const attempts = group.events || [];
                  const groupName = section.name;
                  const memberNames = group.users
                    .map(user => `${user.firstName} ${user.lastName}`)
                    .join(', ');

                  return (
                    <Card
                      key={group.groupId}
                      className="rounded-2xl overflow-hidden bg-gradient-to-b from-green-50 to-green-100 border-2 w-full"
                    >
                      <div className="p-4">
                        <div className="space-y-3">
                          <div className="pb-2 border-b border-gray-200">
                            <p className="text-lg font-semibold text-gray-900">{groupName}</p>
                          </div>
                          <div className="pb-2">
                            <p className="text-md font-medium text-gray-700">
                              {`Group ${groupIndex + 1}`}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600 leading-relaxed">
                              <span className="font-medium text-gray-700">Athletes: </span>
                              {memberNames}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center gap-3">
                            <div className="flex flex-wrap gap-1.5">
                              {attempts.map(attempt => (
                                <div
                                  key={attempt.id}
                                  className={`w-2.5 h-2.5 rounded-full ${
                                    attempt.type === 'hit' ? 'bg-green-600' : 'bg-red-600'
                                  }`}
                                />
                              ))}
                            </div>
                            {attempts.length > 0 && (
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-gray-500 hover:text-gray-700"
                                onClick={() => {
                                  const key = `${section.sectionId}-${group.groupId}`;
                                  onDelete(section.sectionId, group.groupId, key);
                                }}
                                loading={isLoading(`${section.sectionId}-${group.groupId}`)}
                              >
                                <Undo2 className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                          {attempts.length > 0 && (
                            <div className="text-right">
                              <div className="text-sm text-gray-600 font-medium">
                                Reps: {attempts.length}
                              </div>
                              <div className="text-sm font-semibold">
                                {calculateHitPercentage(attempts)}% Hit
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="flex justify-between mt-4">
                          <Button
                            className="w-[45%] h-14 rounded-xl bg-gradient-to-b from-green-500 to-green-600 border-green-700 text-white text-xl font-bold border-2 hover:scale-102 active:bg-green-800 active:scale-95"
                            onClick={() => {
                              const key = `${section.sectionId}-${group.groupId}-hit`;
                              onSubmit(
                                {
                                  id: hitMissCurrentList?.id ?? 0,
                                  sectionId: section.sectionId,
                                  groupId: group.groupId,
                                  type: 'hit',
                                },
                                key
                              );
                            }}
                            loading={isLoading(`${section.sectionId}-${group.groupId}-hit`)}
                          >
                            HIT
                          </Button>
                          <Button
                            className="w-[45%] h-14 rounded-xl bg-gradient-to-b from-red-500 to-red-600 border-red-700 text-white text-xl font-bold border-2 hover:scale-102 active:bg-red-800 active:scale-95"
                            onClick={() => {
                              const key = `${section.sectionId}-${group.groupId}-miss`;
                              onSubmit(
                                {
                                  id: hitMissCurrentList?.id ?? 0,
                                  sectionId: section.sectionId,
                                  groupId: group.groupId,
                                  type: 'miss',
                                },
                                key
                              );
                            }}
                            loading={isLoading(`${section.sectionId}-${group.groupId}-miss`)}
                          >
                            MISS
                          </Button>
                        </div>
                      </div>
                    </Card>
                  );
                })
              )}
            </div>

            <div className="pt-6 pb-16">
              <Button
                onClick={handleReset}
                className="w-full h-12 bg-red-600 hover:bg-red-700 text-white font-medium rounded-md flex items-center justify-center gap-2"
                loading={isLoading('reset')}
              >
                {!isLoading('reset') && <RefreshCw className="h-5 w-5" />}
                Reset All
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
