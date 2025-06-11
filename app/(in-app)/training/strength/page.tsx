'use client';
import React, { ReactNode, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { PlusIcon, SearchIcon } from 'lucide-react';
import ProgramSection from './_components/ProgramSection';
import { AppInput } from '@/components/compose';
import Link from 'next/link';
import { useListStrengthPrograms } from './_hooks';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ROUTES } from '@/utils/constants';
import { useStrengthStore, TabsValue } from '@/store';

const CustomTabTrigger = ({ value, children }: { value: TabsValue; children: ReactNode }) => {
  return (
    <TabsTrigger
      value={value}
      className="text-base data-[state=active]:shadow-none data-[state=active]:text-primary"
    >
      {children}
    </TabsTrigger>
  );
};

export default function StrengthPage() {
  const { setProgramType, tabs } = useStrengthStore();
  const { listStrengthPrograms, setType, debounceSearch, fetchListStrengthPrograms } =
    useListStrengthPrograms();

  const onTabChange = (tabValue: TabsValue) => {
    setProgramType(tabValue);
    setType(tabValue);
  };

  // useEffect(() => {
  //   setListExercisesFromStore([]);
  // }, []);
  return (
    <section>
      <Tabs
        defaultValue={TabsValue.MyPrograms}
        className="border-b sticky top-9 z-50 bg-white border-t"
        onValueChange={value => onTabChange(value as TabsValue)}
      >
        <TabsList className="w-full mx-auto px-4 bg-white items-center">
          {tabs.map(({ value, label }) => (
            <CustomTabTrigger key={value} value={value}>
              <span>{label}</span>
            </CustomTabTrigger>
          ))}
        </TabsList>
      </Tabs>
      <div className="max-w-3xl mb-4 mx-auto px-4 padding-top-section padding-bottom-section">
        <Link href={`/${ROUTES.TRAINING_STRENGTH_NEW}`}>
          <Button className="w-full border-dashed border-2 " size="lg" variant="outline">
            <PlusIcon className="h-5 w-5 mr-2" />
            Create New Program
          </Button>
        </Link>
        <div className="pt-4">
          <div className="relative mb-4">
            <AppInput
              inputProps={{
                placeholder: 'Search programs...',
              }}
              icon={<SearchIcon className="h-4 w-4 text-gray-400" />}
              className="w-full"
              onChange={e => debounceSearch(e.target.value)}
            />
          </div>
          <div className="space-y-4">
            <ProgramSection
              listPrograms={listStrengthPrograms}
              onRefetch={fetchListStrengthPrograms}
            />
          </div>
        </div>
      </div>
      <div className="fixed bottom-app left-0 right-0 px-4 py-2 bg-white border-t">
        <Link
          href="/training/strength/pastStrength"
          className="max-w-3xl mx-auto flex justify-center"
        >
          <Button className="w-4/5" size="lg">
            Past Strength Training
          </Button>
        </Link>
      </div>
    </section>
  );
}
