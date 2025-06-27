'use client';
import { usePathname } from 'next/navigation';
import { TabNavigation } from '../../_components';
import { ROUTES } from '@/utils/constants';
import { useMemo } from 'react';
import { useRole } from '@/hooks';

export const COACH_TABS = [
  {
    title: 'New Check-Off',
    value: 'new',
  },
  {
    title: 'Check-Off Review',
    value: 'review',
  },
  {
    title: 'Team Data',
    value: 'team-data',
  },
];

export const ATHLETE_TABS = [
  {
    title: 'Check-Off Submission',
    value: 'submission',
  },
  {
    title: 'Reviewed Check-Offs',
    value: 'athlete-review',
  },
];

export function TabNavigationCheckOff() {
  const { isCoach } = useRole();
  const pathname = usePathname();
  const [_, __, subPath] = pathname.split('/');

  const listTabs = useMemo(() => (isCoach ? COACH_TABS : ATHLETE_TABS), [isCoach]);
  return (
    <TabNavigation
      value={subPath}
      listTabs={listTabs}
      prefixPath={`/${ROUTES.CHECK_OFF}`}
      className="fixed w-full z-20 shadow top-0"
    />
  );
}
