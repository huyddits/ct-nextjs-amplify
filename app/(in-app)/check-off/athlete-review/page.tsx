'use client';
import { useMemo, useState } from 'react';
import { CheckOffDateParams } from '@/api/types/checkOff';
import { ByAthleteData, MonthCalendar } from '../team-data/_components';
import { useAuthStore } from '@/store';

export default function AthleteReview() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const formattedDate = useMemo((): CheckOffDateParams | undefined => {
    if (!selectedDate) return undefined;
    return {
      month: selectedDate.getMonth() + 1,
      year: selectedDate.getFullYear(),
    };
  }, [selectedDate]);
  const { info } = useAuthStore();
  return (
    <div className="padding-top-pagePast padding-bottom-pagePast max-w-4xl mx-auto px-4">
      <MonthCalendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />

      <div className="py-4">
        <ByAthleteData selectedDate={formattedDate} athleteId={info?.id} />
      </div>
    </div>
  );
}
