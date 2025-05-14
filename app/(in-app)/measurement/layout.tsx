import React from 'react';
import { TabNavigation } from './_components';
export default function MeasurementLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <TabNavigation />
      <div>{children}</div>
      <div className="h-32" />
    </div>
  );
}
