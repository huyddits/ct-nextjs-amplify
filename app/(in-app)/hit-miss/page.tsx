'use client';
import { useRole } from '@/hooks';
import { ROUTES } from '@/utils/constants';
import { redirect } from 'next/navigation';

export default function MeasurementPage() {
  const { isCoach } = useRole();
  return isCoach ? redirect(`/${ROUTES.HIT_MISS_ROUTINES}`) : redirect(`/${ROUTES.HIT_MISS_DATA}`);
}
