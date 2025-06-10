import { useState } from 'react';
import { AppSelect, type SelectOption } from '@/components/compose';
import { cn } from '@/lib/utils';

interface ProgramTypeSelectProps {
  value: string;
  options: SelectOption[];
  className?: string;
  onChangeSelected: (value: string) => void;
}
export default function ProgramTypeSelect({
  value,
  options,
  className,
  onChangeSelected,
}: ProgramTypeSelectProps) {
  return (
    <div className={cn('bg-white rounded-lg p-4 shadow-sm', className)}>
      <AppSelect
        label="Program Type"
        placeholder="Select Program Type"
        selectedValue={value}
        onChangeSelected={onChangeSelected}
        options={options}
        fullWidth
      />
    </div>
  );
}
