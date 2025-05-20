'use client';
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useRouter } from 'next/navigation';

type TabOption = {
  title: string;
  value: string;
};
interface TabNavigationProps {
  value: string;
  listTabs: TabOption[];
  className?: string;
  prefixPath: string;
}
export default function TabNavigation({
  value,
  listTabs,
  className,
  prefixPath,
}: TabNavigationProps) {
  const router = useRouter();
  const defaultValue = value ?? listTabs[0].value;
  const onValueChange = (value: string) => {
    router.push(`${prefixPath}/${value}`);
  };

  return (
    <Tabs defaultValue={defaultValue} onValueChange={onValueChange} className={className}>
      <TabsList className="flex p-0">
        {listTabs.map((tab: TabOption) => (
          <TabsTrigger key={tab.value} value={tab.value} className="tab-navigation-item">
            {tab.title}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
