'use client';

import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useState } from 'react';
import { ByAthleteContent, ByBaseSpotterContent, ByFlyerContent } from './_components';
import { useTeamData } from './_hook';
import { useSafeAreaInset } from '@/hooks';

const TAB_VALUES = ['flyer', 'base-spotter', 'athlete'];
export default function MeasurementTeamDataPage() {
  const { insetTop } = useSafeAreaInset();
  const [tab, setTab] = useState(TAB_VALUES[0]);
  const onValueChange = (value: string) => {
    setTab(value);
  };
  return (
    <Tabs defaultValue={tab} onValueChange={onValueChange}>
      <div className="position-avoid-top-nav z-50" style={{ paddingTop: insetTop }}>
        <TabsList className="flex w-full p-0">
          <TabsTrigger value={TAB_VALUES[0]} className="tab-navigation-item">
            By Flyer
          </TabsTrigger>
          <TabsTrigger value={TAB_VALUES[1]} className="tab-navigation-item">
            By Base/Spotter
          </TabsTrigger>
          <TabsTrigger value={TAB_VALUES[2]} className="tab-navigation-item">
            By Athlete
          </TabsTrigger>
        </TabsList>
      </div>
      <div className="max-w-3xl mx-auto mt-24 mb-4">
        <TabsContent value={TAB_VALUES[0]}>
          <ByFlyerContent />
        </TabsContent>
        <TabsContent value={TAB_VALUES[1]}>
          <ByBaseSpotterContent />
        </TabsContent>
        <TabsContent value={TAB_VALUES[2]}>
          <ByAthleteContent />
        </TabsContent>
      </div>
    </Tabs>
  );
}
