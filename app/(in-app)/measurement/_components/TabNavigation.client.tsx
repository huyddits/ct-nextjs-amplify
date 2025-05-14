'use client';
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { usePathname, useRouter } from 'next/navigation';
import { ROUTES } from '@/utils/constants';

const TAB_VALUES = ['new', 'team-data'];

export default function TabNavigation() {
  const router = useRouter();
  const pathname = usePathname();
  const [_, __, subPath] = pathname.split('/');

  const defaultValue = subPath ?? TAB_VALUES[0];
  const onValueChange = (value: string) => {
    router.push(`/${ROUTES.MEASUREMENT}/${value}`);
  };
  return (
    <Tabs defaultValue={defaultValue} onValueChange={onValueChange}>
      <TabsList className="flex">
        <TabsTrigger value={TAB_VALUES[0]} className="tab-navigation-item">
          New Measurement
        </TabsTrigger>
        <TabsTrigger value={TAB_VALUES[1]} className="tab-navigation-item">
          Team Data
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
