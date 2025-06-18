import React from 'react';
import { TabNavigationTraining } from './_components';
import { SafeAreaDetection } from '@/app/_components';
export default function TrainingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <SafeAreaDetection position="top" />
      <TabNavigationTraining />
      <div>{children}</div>
      <SafeAreaDetection position="bottom" />
    </div>
  );
}
