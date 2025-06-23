'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { RefreshCw, Undo2 } from 'lucide-react';
import { useMemo } from 'react';
import { useConfirmStore } from '@/store';
import { Controller } from 'react-hook-form';
import { useReportHitMiss } from './_components';
import { AppSelect } from '@/components/compose';
import { on } from 'events';

export default function ReportPage() {
  const { confirm } = useConfirmStore();
  const { control, hitMissRoutineList, hitMissCurrentList, onSubmit, onDelete, onSubmitComplete } =
    useReportHitMiss({
      onSuccess: () => {},
      onFailure: () => {},
    });
  const handleReset = () => {
    confirm({
      title: 'WARNING!',
      description: 'Are you sure you want to reset?',
      onConfirm: () => {
        onSubmitComplete();
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
        <div>
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

        <div className="space-y-4">
          {hitMissCurrentList?.events.sections.map(section =>
            section.groups.map(group => {
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
                        <p className="text-md font-medium text-gray-700">{`Rep Count: ${group.repCount}`}</p>
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
                          {attempts.map((attempt, index) => (
                            <div
                              key={index}
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
                            onClick={onDelete}
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
                        className="w-[45%] h-14 rounded-xl transition-all duration-200 bg-gradient-to-b from-green-500 to-green-600 hover:scale-102 border-green-700 text-white font-bold text-xl border-2 active:bg-green-800 active:scale-95"
                        onClick={() =>
                          onSubmit({
                            id: hitMissCurrentList?.id ?? 0,
                            sectionId: section.sectionId,
                            groupId: group.groupId,
                            type: 'hit',
                          })
                        }
                      >
                        HIT
                      </Button>
                      <Button
                        className="w-[45%] h-14 rounded-xl transition-all duration-200 bg-gradient-to-b from-red-500 to-red-600 hover:scale-102 border-red-700 text-white font-bold text-xl border-2 active:bg-red-800 active:scale-95"
                        onClick={() =>
                          onSubmit({
                            id: hitMissCurrentList?.id ?? 0,
                            sectionId: section.sectionId,
                            groupId: group.groupId,
                            type: 'miss',
                          })
                        }
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
          >
            <RefreshCw className="h-5 w-5" />
            Reset All
          </Button>
        </div>
      </div>
    </div>
  );
}
