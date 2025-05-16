'use client';

import { useState } from 'react';
import AppDatePicker from '@/components/compose/AppDatePicker.client';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import dayjs from 'dayjs';

export default function DatePastTrainingSection() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const previousWeek = () => {
    if (selectedDate) {
      const prevWeek = new Date(selectedDate);
      prevWeek.setDate(prevWeek.getDate() - 7);
      setSelectedDate(prevWeek);
    }
  };

  const nextWeek = () => {
    if (selectedDate) {
      const nextWeek = new Date(selectedDate);
      nextWeek.setDate(nextWeek.getDate() + 7);
      setSelectedDate(nextWeek);
    }
  };

  return (
    <div className="flex items-center mb-4">
      <Button variant="outline" size="icon" onClick={previousWeek} className="mr-1">
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <AppDatePicker
        icon={<CalendarIcon className="icon-input" />}
        label="Select Date"
        dateFormat="MM/dd/yyyy"
        placeholder="mm/dd/yyyy"
        value={dayjs(selectedDate).format('MM/DD/YYYY')}
        onChange={date => {
          if (date) setSelectedDate(date);
        }}
      />

      <Button variant="outline" size="icon" onClick={nextWeek} className="ml-1">
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
