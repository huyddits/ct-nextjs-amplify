'use client';
import {
  CreateProgram,
  ProgramStrength,
  SearchProgram,
  EquipmentFilterMockData,
  AddExerciseProgramSection,
  AvailableExerciseProgramSection,
} from './_components';
import { Button } from '@/components/ui/button';

export default function CreateStrengthPage() {
  return (
    <div className="pt-[56px] pb-[80px] max-w-3xl mx-auto px-4">
      <CreateProgram />
      <ProgramStrength />
      <SearchProgram />
      <EquipmentFilterMockData />
      <AvailableExerciseProgramSection />
      <AddExerciseProgramSection />
      <Button className="w-full" size="lg">
        Go to Program Editor
      </Button>
    </div>
  );
}
