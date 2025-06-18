'use client';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { Dispatch, SetStateAction, useMemo } from 'react';
import AppCalendar from '@/components/compose/AppCalendar.client';
import { Button } from '@/components/ui/button';

export type Props = {
  selectedDate: Date;
  setSelectedDate: Dispatch<SetStateAction<Date>>;
};

export function MonthCalendar({ selectedDate, setSelectedDate }: Props) {
  const formattedLabel = useMemo(
    () =>
      selectedDate.toLocaleString('default', {
        month: 'long',
        year: 'numeric',
      }),
    [selectedDate]
  );

  const handlePrev = () => {
    setSelectedDate(prev => {
      const prevMonth = new Date(prev.getFullYear(), prev.getMonth() - 1, 1);
      return prevMonth;
    });
  };

  const handleNext = () => {
    setSelectedDate(prev => {
      const nextMonth = new Date(prev.getFullYear(), prev.getMonth() + 1, 1);
      return nextMonth;
    });
  };

  return (
    <div className="py-3 flex items-center justify-between border-b">
      <Button variant="ghost" size="icon" onClick={handlePrev}>
        <ChevronLeft className="size-6 text-gray-600" />
      </Button>

      <AppCalendar
        icon={<Calendar className="size-5 text-primary" />}
        value={selectedDate}
        triggerLabel={formattedLabel}
        dateFormat="MM/YYYY"
        onChange={date => {
          if (date) {
            setSelectedDate(date);
          }
        }}
        fullWidth
        variant="ghost"
      />
      <Button variant="ghost" size="icon" onClick={handleNext}>
        <ChevronRight className="size-6 text-gray-600" />
      </Button>
    </div>
  );
}
