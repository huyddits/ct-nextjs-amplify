import React from 'react';
import { TabNavigationMeasurement } from './_components';
export default function MeasurementLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <TabNavigationMeasurement />
      <div>{children}</div>
      <div className="h-32" />
    </div>
  );
}
