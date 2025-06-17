'use client';
import { useMemo, useState } from 'react';
import {
  TitlePastStrength,
  DatePastStrengthSection,
  PastStrengthTrainingSection,
} from './_components';
import { GetStrengthPastTrainingDataPayload } from '@/api/types/strength';
import { endOfWeek, startOfWeek } from 'date-fns';
import { useGetPastStrengthTraining } from './_hooks';

export default function PastStrengthTrainingPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const queryParams = useMemo((): GetStrengthPastTrainingDataPayload => {
    return {
      start_date: startOfWeek(selectedDate, { weekStartsOn: 1 }).toISOString().slice(0, 10),
      end_date: endOfWeek(selectedDate, { weekStartsOn: 1 }).toISOString().slice(0, 10),
    };
  }, [selectedDate]);
  const { data, isLoading } = useGetPastStrengthTraining(queryParams);
  return (
    <div className="padding-top-pagePast padding-bottom-pagePast max-w-3xl mx-auto px-4">
      <TitlePastStrength />
      <main>
        <DatePastStrengthSection selectedDate={selectedDate} onChangeDate={setSelectedDate} />
        <PastStrengthTrainingSection data={data} isLoading={isLoading} />
      </main>
    </div>
  );
}
