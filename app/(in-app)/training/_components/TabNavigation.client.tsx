'use client';
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { usePathname, useRouter } from 'next/navigation';
import { ROUTES } from '@/utils/constants';

const TAB_VALUES = ['strength', 'cardio', 'team-training-log'];

export default function TabNavigation() {
  const router = useRouter();
  const pathname = usePathname();
  const [_, __, subPath] = pathname.split('/');
  const defaultValue = subPath ?? TAB_VALUES[0];
  const onValueChange = (value: string) => {
    router.push(`/${ROUTES.TRAINING}/${value}`);
  };

  return (
    <Tabs defaultValue={defaultValue} onValueChange={onValueChange}>
      <TabsList className="flex sticky top-0 z-50 bg-white">
        <TabsTrigger value={TAB_VALUES[0]} className="tab-navigation-item">
          Strength
        </TabsTrigger>
        <TabsTrigger value={TAB_VALUES[1]} className="tab-navigation-item">
          Cardio
        </TabsTrigger>
        <TabsTrigger value={TAB_VALUES[2]} className="tab-navigation-item">
          Team Training Log
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
