import { useState } from 'react';
import { AppSelect } from '@/components/compose';

export default function ProgramTypeSelect() {
  const [programType, setProgramType] = useState('team');

  const programOptions = [
    { label: 'Team Program', value: 'team' },
    { label: 'Individual Program', value: 'individual' },
    { label: 'Custom Program', value: 'custom' },
  ];

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm mb-4">
      <h2 className="text-sm text-gray-500 mb-2 font-semibold">Program Type</h2>
      <AppSelect
        placeholder="Select Program Type"
        selectedValue={programType}
        onChangeSelected={value => setProgramType(value)}
        options={programOptions}
        fullWidth
      />
    </div>
  );
}
