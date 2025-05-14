'use client';
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { usePathname, useRouter } from 'next/navigation';
import { ROUTES } from '@/utils/constants';

export default function TabNavigation() {
  const router = useRouter();
  const pathname = usePathname();
  const [_, __, subPath] = pathname.split('/');
  const onValueChange = (value: string) => {
    router.push(`/${ROUTES.TRAINING}/${value}`);
  };
  return (
    <Tabs defaultValue={subPath} onValueChange={onValueChange}>
      <TabsList className="flex">
        <TabsTrigger
          value="strength"
          className="flex-1 flex text-gray-600 py-2 px-4 text-center data-[state=active]:bg-primary data-[state=active]:text-white"
        >
          Strength
        </TabsTrigger>
        <TabsTrigger
          value="cardio"
          className="flex-1 flex text-gray-600 py-2 px-4 text-center data-[state=active]:bg-primary data-[state=active]:text-white"
        >
          Cardio
        </TabsTrigger>
        <TabsTrigger
          value="team-training-log"
          className="flex-1 flex text-gray-600 py-2 px-4 text-center data-[state=active]:bg-primary data-[state=active]:text-white"
        >
          Team Training Log
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
