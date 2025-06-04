'use client';
import { useState } from 'react';
import {
  TitlePastStrength,
  DatePastStrengthSection,
  PastStrengthTrainingSection,
} from './_components';

export default function PastStrengthTrainingPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  return (
    <div className="pt-[56px] pb-[80px] max-w-3xl mx-auto px-4">
      <TitlePastStrength />
      <main>
        <DatePastStrengthSection selectedDate={selectedDate} onChangeDate={setSelectedDate} />
        <PastStrengthTrainingSection />
      </main>
    </div>
  );
}
