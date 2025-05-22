'use client';
import { usePathname } from 'next/navigation';
import { TabNavigation } from '../../_components';
import { ROUTES } from '@/utils/constants';
import { useMemo } from 'react';

const coachTabs = [
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

const athleteTabs = [
  {
    title: 'Check-Off Submission',
    value: 'submission',
  },
  {
    title: 'Reviewed Check-Offs',
    value: 'reviewed',
  },
];
export default function TabNavigationCheckOff() {
  const pathname = usePathname();
  const [_, __, subPath] = pathname.split('/');

  const isCoach = true;

  const listTabs = useMemo(() => (isCoach ? coachTabs : athleteTabs), []);
  return (
    <TabNavigation
      value={subPath}
      listTabs={listTabs}
      prefixPath={`/${ROUTES.CHECK_OFF}`}
      className="fixed w-full z-20 shadow"
    />
  );
}
