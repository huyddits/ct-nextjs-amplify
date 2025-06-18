'use client';
import React, { CSSProperties } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useRouter } from 'next/navigation';
import { SafeAreaDetection } from '@/app/_components';

type TabOption = {
  title: string;
  value: string;
};
interface TabNavigationProps {
  value: string;
  style?: CSSProperties;
  listTabs: TabOption[];
  className?: string;
  prefixPath: string;
}
export default function TabNavigation({
  value,
  style,
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
    <div className={className} style={style}>
      <SafeAreaDetection className="bg-yellow-500" position="top" />
      <Tabs defaultValue={defaultValue} onValueChange={onValueChange}>
        <TabsList className="flex p-0">
          {listTabs.map((tab: TabOption) => (
            <TabsTrigger key={tab.value} value={tab.value} className="tab-navigation-item">
              {tab.title}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
}
