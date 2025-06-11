'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import { ROUTES } from '@/utils/constants';
import { TabNavigation } from '@/app/(in-app)/_components/';

export default function TabNavigationClient() {
  const pathname = usePathname();
  const [_, __, subPath] = pathname.split('/');
  return (
    <TabNavigation
      value={subPath}
      listTabs={[
        { title: 'Strength', value: 'strength' },
        { title: 'Cardio', value: 'cardio' },
        { title: 'Team Training Log', value: 'team-training-log' },
      ]}
      prefixPath={`/${ROUTES.TRAINING}`}
      className="fixed w-full z-20 shadow top-0"
    />
  );
}
