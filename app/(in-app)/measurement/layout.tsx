import React from 'react';
import { RouteGuardPolicyFitness, TabNavigationMeasurement } from './_components';
import { SafeAreaDetection } from '@/app/_components';
import { ContentWrapperGuard } from '../_components';
export default function MeasurementLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <SafeAreaDetection position="top" />
      <RouteGuardPolicyFitness />
      <TabNavigationMeasurement />
      <ContentWrapperGuard policy="fitness">
        <div>{children}</div>
      </ContentWrapperGuard>
      <div className="h-16" />
      <SafeAreaDetection position="bottom" />
    </div>
  );
}
