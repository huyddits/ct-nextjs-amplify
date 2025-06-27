'use client';
import { useRole } from '@/hooks';
import { ROUTES } from '@/utils/constants';
import { redirect } from 'next/navigation';
export default function CheckOffPage() {
  const { isCoach } = useRole();
  return redirect(isCoach ? `/${ROUTES.CHECK_OFF_NEW}` : `/${ROUTES.CHECK_OFF_SUBMISSION}`);
}
