import React from 'react';
import { TabNavigationMeasurement } from './_components';
export default function MeasurementLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <TabNavigationMeasurement />
      <div>{children}</div>
<<<<<<< HEAD
      <div className="h-16" />
=======
      <div className="h-32" />
>>>>>>> c7c5033 (fix(component): move html to this file instead of export from _components,...)
    </div>
  );
}
