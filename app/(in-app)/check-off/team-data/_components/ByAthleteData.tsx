'use client';

import { useGetListAthlete } from '@/app/(in-app)/hit-miss/routines/_hooks';
import { AppSelect } from '@/components/compose';
import { useEffect, useMemo, useState } from 'react';
import { useCheckOffByAthlete } from '../_hooks';
import { SingleAthleteTask } from './SingleAthleteTask';
import { Loader2Icon } from 'lucide-react';
import { CheckOffDateParams } from '@/api/types/checkOff';
type Props = {
  selectedDate?: CheckOffDateParams;
  athleteId?: string;
  coachCode?: string | null;
};
export function ByAthleteData({ selectedDate, athleteId, coachCode }: Props) {
  const [selectedAthleteId, setSelectedAthleteId] = useState<string>();

  useEffect(() => {
    if (athleteId) {
      setSelectedAthleteId(athleteId);
    }
  }, [athleteId]);

  const { data: checkOffData, isValidating: isLoadingCheckOffData } = useCheckOffByAthlete(
    selectedAthleteId,
    selectedDate
  );
  const { data: athleteList, isLoading: isLoadingAthleteList } = useGetListAthlete(coachCode || '');

  const athleteOptions = useMemo(() => {
    return (
      athleteList?.map(athlete => ({
        label: `${athlete.athlete.profile.first_name} ${athlete.athlete.profile.last_name}`,
        value: athlete.athlete_id,
      })) || []
    );
  }, [athleteList]);
  return (
    <>
      {!athleteId && (
        <AppSelect
          className="w-ful mb-4"
          options={athleteOptions}
          selectedValue={selectedAthleteId}
          onChangeSelected={v => setSelectedAthleteId(v)}
          placeholder="Select Athlete"
          loading={isLoadingAthleteList}
          fullWidth
          required
        />
      )}

      <div className="mb-4 border rounded-md overflow-hidden">
        <div className="bg-[#257951] text-white py-2 px-3 font-medium text-center">
          Monthly Check-Off Completion
        </div>
        <div className="p-4 flex items-center justify-center bg-white">
          {selectedAthleteId ? (
            <div className="">
              {isLoadingCheckOffData ? (
                <div className="flex items-center justify-center p-4">
                  <Loader2Icon className="w-8 h-8 animate-spin text-primary" />
                </div>
              ) : (
                <div className="text-4xl font-bold text-primary">
                  {checkOffData?.percent_completion || 0}%
                </div>
              )}
            </div>
          ) : (
            <div className="text-gray-500">Select an athlete to view completion data</div>
          )}
        </div>
      </div>

      {/* Check-Off Data Table */}
      <div className="border rounded-md overflow-hidden mb-6">
        <div className="bg-primary text-white py-2 px-3 font-medium text-center">
          Assigned Check-Off Data
        </div>
        {selectedAthleteId ? (
          <>
            {isLoadingCheckOffData ? (
              <div className="flex items-center justify-center p-4">
                <Loader2Icon className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : !checkOffData?.data.length ? (
              <div className="p-4 flex justify-center text-gray-500">
                No check-off data available for this athlete
              </div>
            ) : (
              <div className="bg-white">
                {checkOffData.data.map((task, index) => (
                  <SingleAthleteTask key={task.due_date + index} data={task} />
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="p-4 text-gray-500 flex justify-center">
            Select an athlete to view check-off data
          </div>
        )}
      </div>
    </>
  );
}
