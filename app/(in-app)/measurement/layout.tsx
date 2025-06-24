import React from 'react';
import { RouteGuardPolicyFitness, TabNavigationMeasurement } from './_components';
import { SafeAreaDetection } from '@/app/_components';
export default function MeasurementLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <SafeAreaDetection position="top" />
      <RouteGuardPolicyFitness />
      <TabNavigationMeasurement />
      <div>{children}</div>
      <div className="h-16" />
      <SafeAreaDetection position="bottom" />
    </div>
  );
}
