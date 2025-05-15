'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import { ROUTES } from '@/utils/constants';
import { TabNavigation } from '@/app/(in-app)/_components';

export default function TabNavigationMeasurement() {
  const pathname = usePathname();
  const [_, __, subPath] = pathname.split('/');
  return (
    <TabNavigation
      value={subPath}
      listTabs={[
        { title: 'New Measurement', value: 'new' },
        { title: 'Team Data', value: 'team-data' },
      ]}
      prefixPath={`/${ROUTES.MEASUREMENT}`}
      className="fixed w-full z-20 shadow"
    />
  );
}
