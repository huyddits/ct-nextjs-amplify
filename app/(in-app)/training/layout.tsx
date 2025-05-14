import React from 'react';
import { TabNavigation } from './_components';
export default function TrainingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <TabNavigation />
      <div>{children}</div>
    </div>
  );
}
