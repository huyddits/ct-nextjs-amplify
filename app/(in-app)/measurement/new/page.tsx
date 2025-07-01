'use client';

import { useState } from 'react';
import { useAuthStore } from '@/store';
import { useRole } from '@/hooks';
import { MeasurementNewAthletePage, MeasurementNewCoachPage } from './_components';

export default function MeasurementNewPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { info } = useAuthStore();
  const { isCoach, isAthlete } = useRole();

  return (
    <div className="py-4">
      {isCoach && <MeasurementNewCoachPage />}
      {isAthlete && <MeasurementNewAthletePage />}
    </div>
  );
}
