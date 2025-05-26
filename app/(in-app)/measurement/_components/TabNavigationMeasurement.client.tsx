'use client';
import React, { useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { ROUTES } from '@/utils/constants';
import { TabNavigation } from '@/app/(in-app)/_components';
import { useAuthStore } from '@/store';
import { AccountType } from '@/utils/types';

export default function TabNavigationMeasurement() {
  const { info } = useAuthStore();
  const pathname = usePathname();
  const [_, __, subPath] = pathname.split('/');
  console.log('info', info);
  const listTabs = useMemo(
    () =>
      info?.accountType === AccountType.Coach
        ? [
            { title: 'New Measurements', value: 'new' },
            { title: 'Team Data', value: 'team-data' },
          ]
        : [
            { title: 'New Measurements', value: 'new' },
            { title: 'Past Measurements', value: 'past' },
          ],
    [info?.accountType]
  );
  return (
    <TabNavigation
      value={subPath}
      listTabs={listTabs}
      prefixPath={`/${ROUTES.MEASUREMENT}`}
      className="fixed w-full z-20 shadow top-0"
    />
  );
}
