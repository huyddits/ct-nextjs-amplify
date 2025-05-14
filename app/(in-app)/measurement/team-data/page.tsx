'use client';

import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useState } from 'react';
import { ByAthleteContent, ByBaseSpotterContent, ByFlyerContent } from './_components';

const TAB_VALUES = ['flyer', 'base-spotter', 'athlete'];
export default function MeasurementTeamDataPage() {
  const [tab, setTab] = useState(TAB_VALUES[0]);
  const onValueChange = (value: string) => {
    setTab(value);
  };
  return (
    <div className="max-w-3xl mx-auto mt-8 mb-4">
      <Tabs defaultValue={tab} onValueChange={onValueChange}>
        <TabsList className="flex">
          <TabsTrigger value={TAB_VALUES[0]} className="tab-navigation-item">
            By flyer
          </TabsTrigger>
          <TabsTrigger value={TAB_VALUES[1]} className="tab-navigation-item">
            By Base/Spotter
          </TabsTrigger>
          <TabsTrigger value={TAB_VALUES[2]} className="tab-navigation-item">
            By Athlete
          </TabsTrigger>
        </TabsList>
        <TabsContent value={TAB_VALUES[0]}>
          <ByFlyerContent />
        </TabsContent>
        <TabsContent value={TAB_VALUES[1]}>
          <ByBaseSpotterContent />
        </TabsContent>
        <TabsContent value={TAB_VALUES[2]}>
          <ByAthleteContent />
        </TabsContent>
      </Tabs>
    </div>
  );
}
