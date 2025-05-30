'use client';
import { CreateProgram, ProgramStrength, SearchProgram, EquipmentFilter } from './_components';

export default function CreateStrengthPage() {
  return (
    <div className="pt-[56px] pb-[80px] max-w-3xl mx-auto px-4">
      <CreateProgram />
      <ProgramStrength />
      <SearchProgram />
      {/* <EquipmentFilter/> */}
    </div>
  );
}
