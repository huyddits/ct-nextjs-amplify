'use client';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckOffData, MonthCalendar, ReferenceData } from './_components';
import { useState } from 'react';
import { TabsContent } from '@radix-ui/react-tabs';

const TAB_OPTIONS = [
  { value: 'checkoff', label: 'By Check-Off', Component: CheckOffData },
  { value: 'quickref', label: 'Quick Reference', Component: ReferenceData },
  { value: 'athlete', label: 'By Athlete', Component: () => null },
];

export default function CheckOffTeamDataPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  return (
    <div className="padding-top-pagePast padding-bottom-pagePast max-w-4xl mx-auto px-4">
      <MonthCalendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />

      <div className="py-4">
        <Tabs defaultValue={TAB_OPTIONS[0].value}>
          <TabsList className="p-0 flex mb-4 shadow rounded-md overflow-hidden">
            {TAB_OPTIONS.map(tab => (
              <TabsTrigger key={tab.value} value={tab.value} className="tab-navigation-item">
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {TAB_OPTIONS.map(tab => (
            <TabsContent key={tab.value} value={tab.value}>
              <tab.Component />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
