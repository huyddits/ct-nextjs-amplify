'use client';
import { useRole } from '@/hooks';
import { redirect, RedirectType, usePathname } from 'next/navigation';
import { PropsWithChildren } from 'react';
import { ATHLETE_TABS, COACH_TABS } from './TabNavigationCheckOff';
import { ROUTES } from '@/utils/constants';

export function CheckOffProvider({ children }: PropsWithChildren) {
  const { isCoach } = useRole();
  const [_, __, pathname] = usePathname().split('/');
  if (isCoach && ATHLETE_TABS.some(tab => tab.value === pathname))
    return redirect(`/${ROUTES.CHECK_OFF_NEW}`, RedirectType.replace);
  if (!isCoach && COACH_TABS.some(tab => tab.value === pathname))
    return redirect(`/${ROUTES.CHECK_OFF_SUBMISSION}`, RedirectType.replace);
  return <div>{children}</div>;
}
