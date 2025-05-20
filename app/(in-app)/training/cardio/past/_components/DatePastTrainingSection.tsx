'use client';

import { useState, useMemo } from 'react';
import AppCalendar from '@/components/compose/AppCalendar.client';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { startOfWeek, endOfWeek, addWeeks, subWeeks, format } from 'date-fns';

export default function DatePastTrainingSection() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [highlightedDate, setHighlightedDate] = useState<Date>();

  const previousWeek = () => setSelectedDate(prev => subWeeks(prev, 1));
  const nextWeek = () => setSelectedDate(prev => addWeeks(prev, 1));

  const formatDateRange = () => {
    const start = startOfWeek(selectedDate, { weekStartsOn: 1 });
    const end = endOfWeek(selectedDate, { weekStartsOn: 1 });

    if (start.getMonth() !== end.getMonth()) {
      return `${format(start, 'MMM d')} - ${format(end, 'MMM d, yyyy')}`;
    }

    return `${format(start, 'MMM d')} - ${format(end, 'd, yyyy')}`;
  };

  return (
    <div className="flex items-center mb-4 w-full">
      <Button variant="outline" size="icon" onClick={previousWeek} className="mr-1">
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <AppCalendar
        icon={<CalendarIcon className="h-4 w-4" />}
        label=""
        value={highlightedDate ?? selectedDate}
        placeholder={formatDateRange()}
        dateFormat="DD/MM/YYYY"
        onChange={date => {
          if (date) {
            setHighlightedDate(date);
            setSelectedDate(startOfWeek(date, { weekStartsOn: 1 }));
          }
        }}
        fullWidth
      />

      <Button variant="outline" size="icon" onClick={nextWeek} className="ml-1">
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
