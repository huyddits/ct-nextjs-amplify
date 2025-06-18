'use client';
import React, { useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { ROUTES } from '@/utils/constants';
import { TabNavigation } from '@/app/(in-app)/_components/';
import { useAuthStore } from '@/store';
import { AccountType } from '@/utils/types';

export default function TabNavigationClient() {
  const pathname = usePathname();
  const [_, __, subPath] = pathname.split('/');
  const { info } = useAuthStore();
  const listTabs = useMemo(() => {
    const tabs = [
      { title: 'Strength', value: 'strength' },
      { title: 'Cardio', value: 'cardio' },
      { title: 'Team Training Log', value: 'team-training-log' },
    ];
    if (info?.accountType === AccountType.Coach) {
      return tabs;
    } else {
      return tabs.filter(tab => tab.value !== 'team-training-log');
    }
  }, [info?.accountType]);
  return (
    <TabNavigation
      value={subPath}
      listTabs={listTabs}
      prefixPath={`/${ROUTES.TRAINING}`}
      className="fixed w-full z-20 shadow top-0"
    />
  );
}
