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
        <TabsTrigger
          value={TAB_VALUES[0]}
          className="flex-1 flex text-gray-600 py-2 px-4 text-center data-[state=active]:bg-primary data-[state=active]:text-white"
        >
          New Measurement
        </TabsTrigger>
        <TabsTrigger
          value={TAB_VALUES[1]}
          className="flex-1 flex text-gray-600 py-2 px-4 text-center data-[state=active]:bg-primary data-[state=active]:text-white"
        >
          Team Data
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
